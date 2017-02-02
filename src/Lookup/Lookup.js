import React, {Component, PropTypes} from 'react';
import _ from 'underscore';
import {darken, toRgbaString} from '@andrew-codes/color-functions';
import Chip from './../Chip';
import HintText from './../internal/HintText';
import List, {ListItem} from './../List';
import Radium from './../utilities/Radium';
import Popover, {Positions} from './../Popover';
import SubHeader from './../SubHeader';
import ThemeProvider from './../Theme';
import transparent from './../utilities/Transparent';
import * as Filters from './Filters';

const matchOn = prop => valueToMatch => item => item[prop] === valueToMatch;

const configureGetChipValues = (dataSourceConfig, dataSource) => (oid) => {
    if (!dataSourceConfig) {
        return {
            oid,
            text: dataSource[oid],
        };
    }
    const matchOnOidKey = matchOn(dataSourceConfig.oidKey);
    const itemData = dataSource.find(matchOnOidKey(oid));
    let text;
    if (typeof (dataSourceConfig.text) === 'string') {
        text = itemData[dataSourceConfig.text];
    }
    else {
        text = dataSourceConfig.text(itemData);
    }

    return {
        oid,
        text,
    };
};

class Lookup extends Component {
    static propTypes = {
        /**
         * Background color of selected item chips
         */
        chipBackgroundColor: PropTypes.string,
        /**
         * Text color of selected item chips
         */
        chipColor: PropTypes.string,
        /**
         * Array of all possible date items to be filtered when searching using the lookup; uniqueness is either the index of the item (when an array of strings) or defined by the dataSourceConfig's oidKey
         */
        dataSource: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.object,
            PropTypes.string,
        ])),
        /**
         * Defines mechanism to convert data source item to: text, rendered list item, and unique key
         */
        dataSourceConfig: PropTypes.shape({
            oidKey: PropTypes.string.isRequired,
            renderItem: PropTypes.func.isRequired,
            text: PropTypes.oneOfType([
                PropTypes.string,
                PropTypes.func,
            ]).isRequired,
        }),
        /**
         * If true, the field is 100% width
         */
        fullWidth: PropTypes.bool,
        /**
         * Placeholder text
         */
        hintText: PropTypes.string,
        /**
         *
         */
        listHoverBackgroundColor: PropTypes.string,
        /**
         *
         */
        listHoverColor: PropTypes.string,
        /**
         * Minimum number of characters required to be typed before applying the filter to the result set
         */
        minimumNumberOfCharactersToFilter: PropTypes.number,
        /**
         * When true, allows user to select multiple values from lookup
         */
        multiValue: PropTypes.bool,
        /**
         * Event handler which fires upon the selection of an item from the results list
         */
        onSelect: PropTypes.func,
        /**
         * When true, the auto complete is open
         */
        open: PropTypes.bool,
        /**
         * Header text when one group, otherwise array of groups with header and group filter func
         */
        resultGroups: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.arrayOf(PropTypes.shape({
                filter: PropTypes.func.isRequired,
                header: PropTypes.oneOfType([
                    PropTypes.string,
                    PropTypes.node,
                ]).isRequired,
            })),
        ]),
        /**
         * Callback function used to filter the lookup; accepts searchText, value of each item, and its index
         */
        searchFilter: PropTypes.func.isRequired,
        /**
         * Explicitly set the search text to appear in the lookup
         */
        searchText: PropTypes.string,
        /**
         * Sets the selected values of the lookup; is the string key of the selected object in the data source
         */
        selectedItems: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ])),
        /**
         * Width of the text field
         */
        width: PropTypes.number,
    };
    static defaultProps = {
        chipBackgroundColor: '#e9edf1',
        chipColor: '#474c54',
        dataSource: [],
        fullWidth: false,
        hintText: '',
        listHoverBackgroundColor: '#262626',
        listHoverColor: '#fff',
        minimumNumberOfCharactersToFilter: 3,
        multiValue: false,
        onSelect: () => {
        },
        open: false,
        resultGroups: [],
        searchFilter: Filters.none,
        searchText: '',
        selectedItems: [],
        width: 256,
    };
    static contextTypes = {
        theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
    };

    constructor(props, ...rest) {
        super(props, ...rest);

        this.setSelectedItem = this.setSelectedItem.bind(this);

        this.applyGroupFilter = this.applyGroupFilter.bind(this);
        this.combineWithSearchFilter = this.combineWithSearchFilter.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.removeSelectedItem = this.removeSelectedItem.bind(this);
        this.shouldApplyFilter = this.shouldApplyFilter.bind(this);

        this.handleChangeTextField = this.handleChangeTextField.bind(this);
        this.handleChipRemove = this.handleChipRemove.bind(this);
        this.handleClickHintText = this.handleClickHintText.bind(this);
        this.handleClosePopover = this.handleClosePopover.bind(this);
        this.handleItemSelection = this.handleItemSelection.bind(this);
        this.handleLookupRootClick = this.handleLookupRootClick.bind(this);

        this.renderChips = this.renderChips.bind(this);
        this.renderGroupedResultItems = this.renderGroupedResultItems.bind(this);
        this.renderListItem = this.renderListItem.bind(this);

        this.items = [];

        this.state = {
            open: props.open,
            searchText: props.searchText,
            selectedItems: props.selectedItems,
            width: props.width,
        };
    }

    componentDidMount() {
        const newState = {};
        if (this.props.fullWidth) {
            newState.width = this.getFullWidth();
        }

        this.setState({
            ...newState,
            height: this.getHeight(),
        });
    }

    componentWillReceiveProps(nextProps) {
        const newState = {};
        if (nextProps.fullWidth) {
            newState.height = this.getHeight();
            newState.width = this.getFullWidth();
        }
        else if (this.props.width !== nextProps.width) {
            newState.height = this.getHeight();
            newState.width = nextProps.width;
        }
        if (this.props.searchText !== nextProps.searchText) {
            newState.searchText = nextProps.searchText;
        }
        if (this.props.selectedItems !== nextProps.selectedItems) {
            newState.selectedItems = nextProps.selectedItems;
        }
        this.setState(newState);
    }

    applyGroupFilter(dataSource, groupFilter) {
        const filter = this.combineWithSearchFilter(groupFilter);
        return dataSource
            .map((item, index) => ({
                index,
                oid: item.oid || index,
                value: item,
            }))
            .filter((item, index) => filter(this.state.searchText, item.value, index));
    }

    combineWithSearchFilter(filter) {
        return (searchText, value, index) => filter(value, index)
        && (!this.shouldApplyFilter() || this.props.searchFilter(searchText, value, index));
    }

    getFullWidth() {
        return parseInt(window
            .getComputedStyle(this.rootEl)
            .width
            .replace('px', ''), 10);
    }

    getHeight() {
        return Math.max(
            this.inputField
                .getBoundingClientRect()
                .height,
            this.hintTextWrapper
                .getBoundingClientRect()
                .height
        );
    }

    getStyles() {
        const {
            multiValue,
            fullWidth,
        } = this.props;
        const {
            height,
            width,
        } = this.state;
        const {
            basicFontFamily,
            fieldBorderColor,
            normalBackground,
            normalLineHeight,
            normalRadius,
            smallFontSize,
            textPrimaryColor,
            xxSmallGutter,
        } = this.context.theme;
        const darkenCoefficient = 0.55;
        const paddingMultiplier = 2;
        const borderHeight = 2;
        const textHeight = Math.floor(smallFontSize * normalLineHeight);
        const paddingHeight = xxSmallGutter * paddingMultiplier;
        const textFieldHeight = textHeight + paddingHeight + borderHeight;
        const isHintTextMultipleLines = height > textFieldHeight;
        const marginTop = isHintTextMultipleLines ? `${height - textHeight}px` : '0px';
        const hintTextWrapperHeight = isHintTextMultipleLines
            ? (height + paddingHeight + borderHeight)
            : textFieldHeight;
        const computedWidth = fullWidth ? '100%' : `${width}px`;
        const totalWidthWithoutChipsWidth = fullWidth ? '100%' : `${width}px`;

        return {
            chipWrapper: {
                display: multiValue ? 'inline-flex' : 'flex',
            },
            hintTextWrapper: {
                boxSizing: 'border-box',
                height: `${hintTextWrapperHeight}px`,
                padding: `${xxSmallGutter}px`,
                position: 'absolute',
                top: '0px',
                width: '100%',
            },
            input: {
                background: transparent,
                border: `0px solid ${transparent}`,
                boxSizing: 'border-box',
                color: textPrimaryColor,
                cursor: 'initial',
                fontFamily: basicFontFamily,
                fontSize: `${smallFontSize}px`,
                outline: 'none',
                padding: '0px',
                position: 'relative',
                width: '100%',
            },
            inputWrapper: {
                background: transparent,
                border: `1px solid ${transparent}`,
                boxSizing: 'border-box',
                display: 'inline-flex',
                marginTop,
                minWidth: width,
                padding: `0px ${xxSmallGutter}px`,
                width: '100%',
                zIndex: 11,
            },
            lookupWrapper: {
                background: 'rgba(255,255,255,1)',
                border: `1px solid ${fieldBorderColor}`,
                borderRadius: `${normalRadius}px`,
                boxSizing: 'border-box',
                display: 'flex',
                height: `${hintTextWrapperHeight}px`,
                position: 'absolute',
                top: 0,
                width,
                zIndex: 12,
            },
            paddingForPopover: {
                height: `${hintTextWrapperHeight}px`,
            },
            resultsPaper: {
                background: normalBackground,
                border: `1px solid ${toRgbaString(darken(fieldBorderColor, darkenCoefficient))}`,
                boxSizing: 'border-box',
                width: `${width}px`,
            },
            root: {
                background: transparent,
                height: `${hintTextWrapperHeight}px`,
                position: 'relative',
                width: computedWidth,
            },
            selectedItems: {
                background: transparent,
                display: multiValue ? 'inline-flex' : 'flex',
                height: `${hintTextWrapperHeight}px`,
            },
            textFieldWrapper: {
                height: `${textFieldHeight}px`,
                position: 'relative',
                width: totalWidthWithoutChipsWidth,
            },
        };
    }

    removeSelectedItem(oid) {
        const selectedItems = this.state.selectedItems
            .filter((item) => item !== oid);

        this.setState({
            open: false,
            selectedItems,
        });
    }

    setSelectedItem(oid) {
        const {
            multiValue
        } = this.props;
        const newSelection = [oid];
        const selectedItems = multiValue ? this.state.selectedItems.concat(newSelection) : newSelection;

        this.setState({
            open: false,
            searchText: '',
            selectedItems,
        });
        this.props.onSelect(oid);
    }

    shouldApplyFilter() {
        return this.state.searchText.length >= this.props.minimumNumberOfCharactersToFilter;
    }

    handleChangeTextField(evt) {
        this.setState({
            searchText: evt.target.value,
        });
    }

    handleChipRemove(evt, oid) {
        evt.stopPropagation();
        this.removeSelectedItem(oid)
    }

    handleClickHintText() {
        this.inputField.focus();
    }

    handleClosePopover() {
        this.setState({
            open: false,
        });
    }

    handleItemSelection(evt, index) {
        let selectedItem = this.items.find((item, itemIndex) => itemIndex === index);
        let selectedOid = selectedItem.oid;
        this.setSelectedItem(selectedOid);
    }

    handleLookupRootClick() {
        this.setState({
            open: !this.state.open,
        });
    }

    renderChips(styles) {
        const {
            chipBackgroundColor,
            chipColor,
            dataSource,
            dataSourceConfig,
        } = this.props;
        const {
            selectedItems,
        } = this.state;
        const {
            smallFontSize,
        } = this.context.theme;

        if (_.isEmpty(selectedItems)) {
            return undefined;
        }

        const getChipValues = configureGetChipValues(dataSourceConfig, dataSource);

        return (
            <div
                ref={(el) => {
                    this.chipList = el;
                }}
                style={styles.selectedItems}
            >
                {selectedItems.map((item, index) => (
                    <div style={styles.chipWrapper}>
                        <Chip
                            fullWidth
                            backgroundColor={chipBackgroundColor}
                            color={chipColor}
                            fontSize={smallFontSize}
                            key={index}
                            onRequestRemove={this.handleChipRemove}
                            {...getChipValues(item, index)}
                        />
                    </div>
                ))}
            </div>
        );
    }

    renderListItem(item, index) {
        const {
            dataSourceConfig,
        } = this.props;
        let children = item.value;
        if (dataSourceConfig) {
            children = dataSourceConfig.renderItem(item.value, item.index);
        }

        return (
            <ListItem
                key={index}
            >
                {children}
            </ListItem>
        );
    }

    renderGroupedResultItems(groups) {
        const {
            dataSource,
        } = this.props;

        if (typeof (groups) === 'string') {
            this.items = [{
                __type: 'SubHeader',
                header: groups,
            }]
                .concat(this.applyGroupFilter(dataSource, Filters.none));
        }
        else {
            this.items = groups.reduce((output, group) => output
                    .concat([
                        {
                            __type: 'SubHeader',
                            ...group,
                        },
                    ])
                    .concat(this.applyGroupFilter(dataSource, group.filter))
                , []);
        }

        return this.items
            .map((item, index) => {
                if (item.__type === 'SubHeader') {
                    return <SubHeader key={`subheader${index}`}>{item.header}</SubHeader>
                }
                return this.renderListItem(item, index);
            });
    }

    render() {
        const {
            hintText,
            listHoverBackgroundColor,
            listHoverColor,
            resultGroups,
        } = this.props;
        const {
            searchText,
            selectedItems,
            open,
        } = this.state;
        const isHintTextHidden = Boolean(searchText) || !_.isEmpty(selectedItems);
        const styles = this.getStyles();

        return (
            <div
                style={styles.root}
                onClick={this.handleLookupRootClick}
            >
                <div style={styles.paddingForPopover} />
                <div style={styles.lookupWrapper} ref={(el) => {
                    this.popoverAnchor = el;
                }}>
                    {this.renderChips(styles)}
                    <div

                        style={styles.textFieldWrapper}
                    >
                        <div style={styles.hintTextWrapper}>
                            <div
                                ref={(el) => {
                                    this.hintTextWrapper = el;
                                }}
                            >
                                <HintText
                                    hidden={isHintTextHidden}
                                    text={hintText}
                                    onClick={this.handleClickHintText}
                                />
                            </div>
                        </div>
                        <div
                            ref={(el) => {
                                this.inputWrapper = el;
                            }}
                            style={styles.inputWrapper}
                        >
                            <input
                                ref={(el) => {
                                    this.inputField = el;
                                }}
                                style={styles.input}
                                type="text"
                                value={searchText}
                                onChange={this.handleChangeTextField}
                            />
                        </div>
                    </div>
                </div>
                <Popover
                    anchor={this.popoverAnchor}
                    anchorOrigin={{
                        horizontal: Positions.left,
                        vertical: Positions.bottom,
                    }}
                    open={open}
                    targetOrigin={{
                        horizontal: Positions.left,
                        vertical: Positions.top,
                    }}
                    onRequestClose={this.handleClosePopover}
                >
                    <div
                        style={styles.resultsPaper}
                    >
                        <List
                            hoverBackgroundColor={listHoverBackgroundColor}
                            hoverColor={listHoverColor}
                            onSelectItem={this.handleItemSelection}
                        >
                            {this.renderGroupedResultItems(resultGroups)}
                        </List>
                    </div>
                </Popover>
            </div>
        );
    }
}

export default Radium(Lookup);
