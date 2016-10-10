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
    const hintTextOffset = textHeight - state.hintTextHeight;
    const marginTop = hintTextOffset < 0 ? `${Math.abs(hintTextOffset)}px` : 0;
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
            marginTop: marginTop,
            marginLeft: '6px'
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
        defaultValue: PropTypes.string,
        defaultTheme: PropTypes.shape(TextField.themePropTypes),
        disabled: PropTypes.bool,
        disabledTheme: PropTypes.shape(TextField.themePropTypes),
        errorText: PropTypes.string,
        focusedTheme: PropTypes.shape(TextField.themePropTypes),
        fullWidth: PropTypes.bool,
        hasErrorTheme: PropTypes.shape(TextField.themePropTypes),
        hintText: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        pending: PropTypes.bool,
        pendingTheme: PropTypes.shape(TextField.themePropTypes),
        required: PropTypes.bool,
        width: PropTypes.number,
        value: PropTypes.string
    };
    static defaultProps = {
        defaultTheme: {},
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
        backgroundColor: PropTypes.string,
        border: PropTypes.string,
        borderRadius: PropTypes.number,
        boxShadow: PropTypes.string,
        errorTextColor: PropTypes.string,
        fontFamily: PropTypes.string,
        fontSize: PropTypes.string,
        hintTextColor: PropTypes.string,
        lineHeight: PropTypes.number,
        padding: PropTypes.number,
        outline: PropTypes.string,
        textColor: PropTypes.string,
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
            hintTextHeight: findDOMNode(this.refs.hintText).getBoundingClientRect().height
        });
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            hasValue: !!nextProps.value || !!nextProps.defaultValue,
            hintTextHeight: findDOMNode(this.refs.hintText).getBoundingClientRect().height
        });
    }

    render() {
        const {disabled, defaultValue, errorText, fullWidth, hintText, required, value} = this.props;
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
                    <input style={prepareStyles(styles.input)} type="text" ref="inputField" defaultValue={defaultValue}
                           value={value} disabled={disabled}
                           onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                    {required && fullWidth &&  <RequiredIndicator style={styles.requiredIndicator} /> }
                </div>
                {required && !fullWidth &&  <RequiredIndicator style={styles.requiredIndicator} /> }
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
}
export default TextField;
