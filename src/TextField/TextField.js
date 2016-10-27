import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import * as CustomPropTypes from './../utilities/PropTypes';
import HintText from './../internal/HintText';
import RequiredIndicator from './../internal/RequiredIndicator';
import ErrorMessage from './../internal/ErrorMessage';
import gettingStyles from '../Theme/gettingStyles';
import mergeStyles from './../Theme/mergeStyles';

const getThemeValues = (theme, props, state) => {
    // Themed values based on state
    const focusedThemeValues = state.focused ? {...TextField.defaultThemeProps.focused, ...(theme.TextField.focused || {})} : {};
    const pendingThemeValues = props.pending ? {...TextField.defaultThemeProps.pending, ...(theme.TextField.pending || {})} : {};
    const hasErrorThemeValues = props.errorText ? {...TextField.defaultThemeProps.hasError, ...(theme.TextField.hasError || {})} : {};
    const disabledThemeValues = props.disabled ? {...TextField.defaultThemeProps.disabled, ...(theme.TextField.disabled || {})} : {};

    // Merge default theme values, then theme's default, then state based theme values;
    return mergeStyles(
        TextField.defaultThemeProps.default,
        theme.TextField.default,
        focusedThemeValues,
        pendingThemeValues,
        hasErrorThemeValues,
        disabledThemeValues
    );
};
const getStylesFromTheme = (themeValues, props, state) => {
    const textHeight = Math.floor(themeValues.fontSize * themeValues.lineHeight);
    // text height + top/bottom padding + top/bottom border width
    const textFieldHeight = textHeight + themeValues.padding * 2 + 2;
    const isHintTextTallerThanInput = state.hintTextHeight > textFieldHeight;
    const marginTop = isHintTextTallerThanInput ? `${state.hintTextHeight - textHeight}px` : '0px';
    const hintTextWrapperHeight = isHintTextTallerThanInput ? (state.hintTextHeight + themeValues.padding * 2 + 2) : textFieldHeight;
    const width = props.fullWidth ? '100%' : props.width ? `${props.width}px` : `${themeValues.width}px`;

    const styles = {
        root: {
            background: 'transparent',
            display: 'inline-flex',
            position: 'relative'
        },
        hintTextWrapper: {
            backgroundColor: themeValues.backgroundColor,
            boxShadow: themeValues.boxShadow,
            boxSizing: 'border-box',
            color: themeValues.hintTextColor,
            border: themeValues.border,
            borderRadius: themeValues.borderRadius,
            fontFamily: themeValues.fontFamily,
            fontSize: `${themeValues.fontSize}px`,
            height: `${hintTextWrapperHeight}px`,
            outline: themeValues.outline,
            padding: `${themeValues.padding}px`,
            position: 'absolute',
            top: 0,
            width
        },
        hintTextTheme: {
            color: themeValues.hintTextColor,
            lineHeight: themeValues.lineHeight
        },
        inputWrapper: {
            background: 'transparent',
            border: '1px solid transparent',
            boxSizing: 'border-box',
            display: 'inline-flex',
            height: '100%',
            marginTop,
            minWidth: width,
            padding: `${themeValues.padding}px`,
            width
        },
        input: {
            background: 'rgba(0, 0, 0, 0)',
            border: '0px solid transparent',
            color: themeValues.textColor,
            cursor: props.disabled ? 'not-allowed' : 'initial',
            flex: 1,
            fontFamily: themeValues.fontFamily,
            fontSize: `${themeValues.fontSize}px`,
            height: `${textHeight}px`,
            outline: 'none',
            padding: 0,
            position: 'relative',
            width: '100%'
        },
        requiredIndicator: {
            alignSelf: 'center',
            color: themeValues.errorTextColor,
            marginTop: !props.fullWidth ? marginTop : '0px',
            marginLeft: '6px'
        },
        errorMessageWrapper: {
            alignSelf: 'center',
            lineHeight: `${themeValues.fontSize}px`,
            marginTop: props.fullWidth ? '-8px' : 0,
            marginLeft: props.fullWidth ? 0 : '6px'
        },
        errorMessageTheme: {
            lineHeight: themeValues.lineHeight,
            textColor: themeValues.errorTextColor
        }
    };

    if (props.fullWidth) {
        styles.root.width = '100%';
        styles.root.display = 'block';
        styles.errorMessageWrapper.display = 'block';
        styles.errorMessageWrapper.padding = `${themeValues.padding}px 0`;
    }
    return styles
};
const getStyles = gettingStyles(getThemeValues, getStylesFromTheme);

class TextField extends Component {
    static propTypes = {
        /**
         * Text string to use for the default value
         */
        defaultValue: PropTypes.string,
        /**
         * Override the theme for the default state
         */
        defaultTheme: PropTypes.shape(TextField.themePropTypes),
        /**
         * Disables the text field
         */
        disabled: PropTypes.bool,
        /**
         * Override the theme when text field is disabled
         */
        disabledTheme: PropTypes.shape(TextField.themePropTypes),
        /**
         * Error content to display
         */
        errorText: PropTypes.string,
        /**
         * Override the theme when text field is focused
         */
        focusedTheme: PropTypes.shape(TextField.themePropTypes),
        /**
         * If true, the field is 100% width
         */
        fullWidth: PropTypes.bool,
        /**
         * Override the theme when text field has error text
         */
        hasErrorTheme: PropTypes.shape(TextField.themePropTypes),
        /**
         * Placeholder text
         */
        hintText: PropTypes.string,
        /**
         * Callback fired when text field looses focus
         */
        onBlur: PropTypes.func,
        /**
         * Callback fired when text field value changes
         */
        onChange: PropTypes.func,
        /**
         * Callback fired when text field is focused
         */
        onFocus: PropTypes.func,
        /**
         * Text field state; used when value has changed, but not persisted
         */
        pending: PropTypes.bool,
        /**
         * Override the theme when text field is pending
         */
        pendingTheme: PropTypes.shape(TextField.themePropTypes),
        /**
         * Indicate the text field is required for user input
         */
        required: PropTypes.bool,
        /**
         * Width of the text field
         */
        width: PropTypes.number,
        /**
         * The value of the text field
         */
        value: PropTypes.string
    };
    static defaultProps = {
        defaultTheme: {},
        defaultValue: '',
        disabled: false,
        disabledTheme: {},
        focusedTheme: {},
        fullWidth: false,
        hasErrorTheme: {},
        onBlur: () => {
        },
        onChange: () => {
        },
        onFocus: () => {
        },
        pendingTheme: {},
        required: false,
        width: 256
    };
    static themePropTypes = {
        /**
         * Background color of text field
         */
        backgroundColor: PropTypes.string,
        /**
         * Border (width, style and color) of text field
         */
        border: PropTypes.string,
        /**
         * Border radius of text field
         */
        borderRadius: PropTypes.number,
        /**
         * Box shadow of text field
         */
        boxShadow: PropTypes.string,
        /**
         * Text color of error text content
         */
        errorTextColor: PropTypes.string,
        /**
         * Font family for text field, hint text
         */
        fontFamily: PropTypes.string,
        /**
         * Font size for text field, hint text
         */
        fontSize: PropTypes.string,
        /**
         * Text color of hint text
         */
        hintTextColor: PropTypes.string,
        /**
         * Set the line-height of the text field and hint text
         */
        lineHeight: PropTypes.number,
        /**
         * Padding between text field/hint text content and border
         */
        padding: PropTypes.number,
        /**
         * Outline applied to text field
         */
        outline: PropTypes.string,
        /**
         * Text color of user input content
         */
        textColor: PropTypes.string,
        /**
         * Width of the text field; ignored when fullWidth is true
         */
        width: PropTypes.number
    };
    static defaultThemeProps = {
        default: {
            backgroundColor: '#fff',
            border: '1px solid transparent',
            borderRadius: 0,
            boxShadow: 'none',
            errorTextColor: 'red',
            fontFamily: 'Arial',
            fontSize: 16,
            hintText: '',
            hintTextColor: 'gray',
            lineHeight: 1.5,
            padding: 8,
            outline: '1px solid transparent',
            textColor: 'black',
            width: 256
        },
        disabled: {},
        focused: {},
        hasError: {
            backgroundColor: 'pink'
        },
        pending: {
            backgroundColor: 'yellow'
        }
    };
    static contextTypes = {
        theme: CustomPropTypes.theme
    };

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            hintTextHeight: 32,
            hasValue: !!props.value || !!props.defaultValue,
            focused: false
        };
    }

    componentDidMount() {
        this.setState({
            hintTextHeight: this.getHeight(this.props)
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            hasValue: !!nextProps.value || !!nextProps.defaultValue,
            hintTextHeight: this.getHeight()
        });
    }

    render() {
        const {disabled, defaultValue, errorText, fullWidth, hintText, required} = this.props;
        const {hasValue} = this.state;
        const {prepareStyles} = this.context.theme;
        const styles = getStyles(this);

        return (
            <div style={prepareStyles(styles.root)}>
                <div style={prepareStyles(styles.hintTextWrapper)}>
                    <HintText ref="hintText" text={hintText} defaultTheme={styles.hintTextTheme} hidden={hasValue}
                              onClick={this.focusInput} />
                </div>
                <div style={prepareStyles(styles.inputWrapper)} ref="inputWrapper">
                    <input style={prepareStyles(styles.input)} type="text" ref="inputField"
                           defaultValue={defaultValue}
                           disabled={disabled}
                           onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                    {required && fullWidth && <RequiredIndicator style={styles.requiredIndicator} /> }
                </div>
                {required && !fullWidth && <RequiredIndicator style={styles.requiredIndicator} /> }
                {errorText && <div style={prepareStyles(styles.errorMessageWrapper)}><ErrorMessage text={errorText}
                                                                                                   hidden={!errorText}
                                                                                                   defaultTheme={styles.errorMessageTheme} />
                </div>}
            </div>
        );
    }

    handleChange = (evt) => {
        this.setState({
            hasValue: !!evt.target.value
        });
        this.props.onChange(evt.target.value);
    };

    handleFocus = (evt) => {
        this.setState({
            focused: true
        });
        this.props.onFocus(evt);
    };

    handleBlur = (evt) => {
        this.setState({
            focused: false
        });
        this.props.onBlur(evt);
    };

    focusInput = (evt) => {
        this.handleFocus(evt);
        this.refs.inputField.focus();
    };

    getHeight = () => {
        const inputWrapperHeight = findDOMNode(this.refs.inputWrapper).getBoundingClientRect().height;
        const hintTextHeight = findDOMNode(this.refs.hintText).getBoundingClientRect().height;
        return Math.max(inputWrapperHeight, hintTextHeight);
    };
}
export default TextField;
