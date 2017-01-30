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
const matchOid = matchOn('oid');
const matchesOid = oid => matchOid(oid);

const configureGetChipValues = (dataSourceConfig, dataSource) => (oid, index) => {
    if (!dataSourceConfig) {
        return {
            oid: index,
            text: dataSource[index],
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
const matchesStringValue = value => stringValue => value !== stringValue;

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
         *
         */
        disabled: PropTypes.bool,
        /**
         * Callback function used to filter the lookup; accepts searchText and value of each item in data source
         */
        filter: PropTypes.func,
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
         * Event handler which fires upon the selection of an item from the results list
         */
        onSelect: PropTypes.func,
        /**
         * When true, the auto complete is open
         */
        open: PropTypes.bool,
        /**
         * When provided, this will render as the sub-header to the result list; otherwise it will not render a sub-header
         */
        resultsHeader: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.node,
        ]),
        /**
         * Sets the selected values of the lookup; is the string key of the selected object in the data source
         */
        selectedItems: PropTypes.arrayOf(PropTypes.string),
        /**
         * Width of the text field
         */
        width: PropTypes.number,
    };
    static defaultProps = {
        chipBackgroundColor: '#e9edf1',
        chipColor: '#474c54',
        dataSource: [],
        disabled: false,
        filter: Filters.none,
        fullWidth: false,
        hintText: '',
        listHoverBackgroundColor: '#262626',
        listHoverColor: '#fff',
        minimumNumberOfCharactersToFilter: 3,
        onSelect: () => {
        },
        open: false,
        resultsHeader: null,
        selectedItems: [],
        width: 256,
    };
    static contextTypes = {
        theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
    };

    constructor(props, ...rest) {
        super(props, ...rest);

        this.handleChangeTextField = this.handleChangeTextField.bind(this);
        this.handleClickHintText = this.handleClickHintText.bind(this);
        this.handleLookupRootClick = this.handleLookupRootClick.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.handleClosePopover = this.handleClosePopover.bind(this);
        this.handleChipRemove = this.handleChipRemove.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.renderChip = this.renderChip.bind(this);
        this.renderListItem = this.renderListItem.bind(this);
        this.shouldApplyFilter = this.shouldApplyFilter.bind(this);
        this.state = {
            open: props.open,
            searchText: '',
            selectedItems: props.selectedItems,
            width: props.width,
        };
    }

    componentDidMount() {
        let newState = {};
        if (this.props.fullWidth) {
            newState = {
                ...newState,
                width: this.getFullWidth(),
            };
        }
        this.setState({
            ...newState,
            height: this.getHeight(),
        });
    }

    componentWillReceiveProps(nextProps) {
        let newState = {};
        if (nextProps.fullWidth) {
            newState = {
                ...newState,
                width: this.getFullWidth(),
            };
        }
        else if (this.props.width !== nextProps.width) {
            newState = {
                ...newState,
                width: nextProps.width,
            };
        }
        if (this.props.selectedItems !== nextProps.selectedItems) {
            newState = {
                ...newState,
                selectedItems: nextProps.selectedItems,
            };
        }
        this.setState({
            ...newState,
            height: this.getHeight(),
        });
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

    handleChangeTextField(evt) {
        this.setState({
            searchText: evt.target.value,
        });
    }

    handleLookupRootClick() {
        this.setState({
            open: !this.state.open,
        });
    }

    handleClickHintText() {
        this.inputField.focus();
    }

    handleItemClick(oid) {
        this.setState({
            open: false,
            searchText: '',
            selectedItems: [
                oid,
            ],
        });
        this.props.onSelect(oid);
    }

    handleClosePopover() {
        this.setState({
            open: false,
        });
    }

    handleChipRemove({
        oid, text,
    }) {
        const newState = {};
        if (oid) {
            newState.selectedItems = this.state.selectedItems
                .filter(matchesOid(oid));
        }
        else {
            newState.selectedItems = this.state.selectedItems
                .filter(matchesStringValue(text));
        }
        this.setState(newState);
    }

    getStyles() {
        const {
            disabled,
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

        return {
            hintTextWrapper: {
                background: 'rgba(255,255,255,1)',
                border: `1px solid ${fieldBorderColor}`,
                borderRadius: `${normalRadius}px`,
                boxSizing: 'border-box',
                height: `${hintTextWrapperHeight}px`,
                padding: `${xxSmallGutter}px`,
                position: 'absolute',
                top: 0,
                width: computedWidth,
            },
            input: {
                background: transparent,
                border: `0px solid ${transparent}`,
                boxSizing: 'border-box',
                color: textPrimaryColor,
                cursor: disabled ? 'not-allowed' : 'initial',
                fontFamily: basicFontFamily,
                fontSize: `${smallFontSize}px`,
                outline: 'none',
                padding: 0,
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
                padding: `${xxSmallGutter}px`,
                width,
                zIndex: 11,
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
                display: 'flex',
                height: `${hintTextWrapperHeight}px`,
                position: 'absolute',
                top: 0,
                width,
                zIndex: 12,
            },
            textFieldWrapper: {
                height: `${textFieldHeight}px`,
                position: 'absolute',
                top: 0,
                width: '100%',
            },
        };
    }

    renderChip(styles) {
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
                style={styles.selectedItems}
            >
                {selectedItems.map((item, index) => (
                    <Chip
                        fullWidth
                        backgroundColor={chipBackgroundColor}
                        color={chipColor}
                        fontSize={smallFontSize}
                        key={index}
                        onRequestRemove={this.handleChipRemove}
                        {...getChipValues(item, index)}
                    />
                ))}
            </div>
        );
    }

    renderListItem(item, index) {
        const {
            dataSourceConfig,
        } = this.props;
        let children = item;
        if (dataSourceConfig) {
            children = dataSourceConfig.renderItem(item, index);
        }
        return (
            <ListItem
                itemOid={item.oid || index}
                key={index}
                onClick={this.handleItemClick}
            >
                {children}
            </ListItem>
        );
    }

    shouldApplyFilter() {
        return this.state.searchText.length >= this.props.minimumNumberOfCharactersToFilter;
    }

    render() {
        const {
            dataSource,
            filter,
            hintText,
            listHoverBackgroundColor,
            listHoverColor,
            resultsHeader,
        } = this.props;
        const {
            searchText,
            selectedItems,
            open,
        } = this.state;
        const isHintTextHidden = Boolean(searchText) || !_.isEmpty(selectedItems);
        let filterFunc = Filters.none;
        if (this.shouldApplyFilter()) {
            filterFunc = filter;
        }
        const styles = this.getStyles();

        return (
            <div
                ref={(el) => {
                    this.rootEl = el;
                }}
                style={styles.root}
                onClick={this.handleLookupRootClick}
            >
                <div style={styles.paddingForPopover} />
                {this.renderChip(styles)}
                <div style={styles.textFieldWrapper}>
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
                <Popover
                    anchor={this.rootEl}
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
                        >
                            {Boolean(resultsHeader) && (
                                <SubHeader>
                                    {resultsHeader}
                                </SubHeader>
                            )}
                            {dataSource
                                .filter(item => filterFunc(searchText, item))
                                .map(this.renderListItem)}
                        </List>
                    </div>
                </Popover>
            </div>
        );
    }
}

export default Radium(Lookup);
