import React, {Component, PropTypes} from 'react';
import {darken, toRgbaString} from '@andrew-codes/color-functions';
import {findDOMNode} from 'react-dom';
import Chip from './../Chip';
import HintText from './../internal/HintText';
import List, {ListItem} from './../List';
import Radium from './../utilities/Radium';
import Popover, {Positions} from './../Popover';
import SubHeader from './../SubHeader';
import ThemeProvider from './../Theme';
import transparent from './../utilities/Transparent';

const toItems = (dataSource) => (item) => {
    return dataSource[item];
};

class Lookup extends Component {
    static propTypes = {
        /**
         * Array of strings or nodes that represent each individual result item
         */
        dataSource: PropTypes.object,
        /**
         *
         */
        disabled: PropTypes.bool,
        /**
         * If true, the field is 100% width
         */
        fullWidth: PropTypes.bool,
        /**
         * Function given a selected item and returns the text to display on the Chip for that item
         */
        getChipText: PropTypes.func,
        /**
         * Placeholder text
         */
        hintText: PropTypes.string,
        /**
         * Function given each item to render them within the results list
         */
        itemRenderer: PropTypes.func,
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
        /**
         * Event handler which fires upon the selection of an item from the results list
         */
        onSelect: PropTypes.func,
    };
    static defaultProps = {
        dataSource: {},
        disabled: false,
        fullWidth: false,
        getChipText: (item) => item,
        hintText: '',
        itemRenderer: (item) => item,
        open: false,
        resultsHeader: null,
        selectedItems: [],
        width: 256,
        onSelect: () => {
        },
    };
    static contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,};

    constructor(props, ...rest) {
        super(props, ...rest);

        this.handleChangeTextField = this.handleChangeTextField.bind(this);
        this.handleClickHintText = this.handleClickHintText.bind(this);
        this.handleFocusTextField = this.handleFocusTextField.bind(this);
        this.handleItemClick = this.handleItemClick.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.state = {
            items: props.selectedItems.map(toItems(props.dataSource)),
            open: props.open,
            typedValue: '',
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
            height: this.getHeight()
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
                items: nextProps.selectedItems.map(toItems(props.dataSource)),
            };
        }
        this.setState({
            ...newState,
            height: this.getHeight()
        });
    }

    getFullWidth() {
        const rootEl = findDOMNode(this.rootEl);
        return parseInt(window
            .getComputedStyle(rootEl)
            .width
            .replace('px', '')
        );
    }

    getHeight() {
        return Math.max(this.inputField
                .getBoundingClientRect()
                .height,
            this.hintTextWrapper
                .getBoundingClientRect()
                .height);
    }

    handleChangeTextField(evt) {
        this.setState({
            typedValue: evt.target.value,
        });
    }

    handleFocusTextField() {
        this.setState({open: true});
    }

    handleClickHintText() {
        this.inputField.focus();
    }

    handleItemClick(item) {
        this.setState({
            items: [item],
            open: false,
            typedValue: '',
        });
        this.props.onSelect(item);
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
                position: 'absolute',
                padding: `${xxSmallGutter}px`,
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
                marginTop: marginTop,
                minWidth: width,
                padding: `${xxSmallGutter}px`,
                width: width,
                zIndex: 11,
            },
            paddingForPopover: {
                height: `${hintTextWrapperHeight}px`,
            },
            resultsPaper: {
                background: normalBackground,
                border: `1px solid ${toRgbaString(darken(fieldBorderColor, 0.55))}`,
                boxSizing: 'border-box',
                fontFamily: basicFontFamily,
                width: `${width}px`,
            },
            root: {
                background: transparent,
                height: `${hintTextWrapperHeight}px`,
                position: 'relative',
            },
            selectedItem: {
                flex: 1,
                background: 'gray',
                margin: `${xxSmallGutter}px`,
                alignSelf: 'center',
            },
            selectedItems: {
                background: transparent,
                display: 'flex',
                fontFamily: basicFontFamily,
                height: `${hintTextWrapperHeight}px`,
                position: 'absolute',
                top: 0,
                width,
                zIndex: 12
            },
            textFieldWrapper: {
                position: 'absolute',
                height: `${textFieldHeight}px`,
                top: 0,
                width: '100%',
            },
        }
    }

    render() {
        const {
            dataSource,
            getChipText,
            hintText,
            itemRenderer,
            resultsHeader,
        } = this.props;
        const {
            items,
            typedValue,
            open,
        } = this.state;
        const isHintTextHidden = Boolean(typedValue) || items.length > 0;
        const styles = this.getStyles();

        return (
            <div
                ref={(el) => {
                    this.rootEl = el;
                }}
                style={styles.root}
            >
                <div style={styles.paddingForPopover}></div>
                {items.length > 0 && (
                    <div
                        style={styles.selectedItems}
                    >
                        <Chip
                            fontSize={this.context.theme.smallFontSize}
                            text={getChipText(items[0])}
                        />
                    </div>
                )}
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
                            value={typedValue}
                            onChange={this.handleChangeTextField}
                            onFocus={this.handleFocusTextField}
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
                >
                    <div
                        style={styles.resultsPaper}
                    >
                        <List
                            hoverBackgroundColor="black"
                            hoverColor="white"
                        >
                            {Boolean(resultsHeader) && (
                                <SubHeader>
                                    {resultsHeader}
                                </SubHeader>
                            )}
                            {Object.keys(dataSource).map((key, itemIndex) => (
                                <ListItem
                                    item={dataSource[key]}
                                    key={itemIndex}
                                    onClick={this.handleItemClick}
                                >
                                    {itemRenderer(dataSource[key])}
                                </ListItem>
                            ))}
                        </List>
                    </div>
                </Popover>
            </div>
        );
    }
}

export default Radium(Lookup);
