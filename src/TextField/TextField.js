import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import * as CustomPropTypes from './../utilities/PropTypes';
import HintText from './../internal/HintText';
import RequiredIndicator from './../internal/RequiredIndicator';
import ErrorMessage from './../internal/ErrorMessage';
import gettingStyles from '../Theme/gettingStyles';
import mergeStyles from './../Theme/mergeStyles';

const getThemeValues = (theme, props, state) => {
    const defaultThemeValues = TextField.defaultThemeProps;
    // Themed styles based on state
    const focusedStyles = state.focused ? {...defaultThemeValues.focused, ...(theme.TextField.focused || {})} : {};
    const pendingStyles = props.pending ? {...defaultThemeValues.pending, ...(theme.TextField.pending || {})} : {};
    const errorStyles = props.errorText ? {...defaultThemeValues.hasError, ...(theme.TextField.hasError || {})} : {};
    const disabledStyles = props.disabled ? {...defaultThemeValues.disabled, ...(theme.TextField.disabled || {})} : {};
    // Compose default theme values, then theme, then state based theme values;
    return mergeStyles(
        defaultThemeValues,
        theme.TextField,
        focusedStyles,
        pendingStyles,
        errorStyles,
        disabledStyles
    );
};

const getDefaultStyles = (themeValues, props) => ({
    root: {
        position: 'relative',
        transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    },
    hintText: {
        color: themeValues.hintTextColor,
        border: themeValues.border,
        borderRadius: themeValues.borderRadius,
        fontFamily: themeValues.fontFamily,
        fontSize: `${themeValues.fontSize}px`,
        outline: themeValues.outline,
        padding: `${themeValues.padding}px`
    },
    inputWrapper: {
        backgroundColor: themeValues.backgroundColor,
        padding: `${themeValues.padding}px`
    },
    input: {
        background: 'rgba(0, 0, 0, 0)',
        color: themeValues.textColor,
        cursor: props.disabled ? 'not-allowed' : 'initial',
        flex: 1,
        fontFamily: themeValues.fontFamily,
        fontSize: `${themeValues.fontSize}px`,
        outline: 'none',
        padding: 0,
        position: 'relative',
        width: '100%'
    },
    requiredIndicator: {
        alignSelf: 'center'
    }
});

const getRequiredStyles = (themeValues, props, state) => {
    const fontSizeAdjustedHeight = themeValues.fontSize * themeValues.lineHeight;
    // font size adjusted height + top & bottom padding + top & bottom border
    const height = fontSizeAdjustedHeight + themeValues.padding * 2 + 2;
    const hintTextOffset = height - state.hintTextHeight;
    const marginTop = hintTextOffset < 0 ? `${Math.abs(hintTextOffset)}px` : 0;
    const width = props.fullWidth ? '100%' : props.width ? `${props.width}px` : `${themeValues.width}px`;

    const styles = {
        root: {
            display: 'inline-flex',
            background: 'transparent'
        },
        hintText: {
            backgroundColor: themeValues.backgroundColor,
            boxShadow: themeValues.boxShadow,
            boxSizing: 'border-box',
            position: 'absolute',
            top: 0,
            width
        },
        hintTextProps: {
            lineHeight: themeValues.lineHeight,
        },
        inputWrapper: {
            background: 'transparent',
            border: '1px solid transparent',
            boxSizing: 'border-box',
            display: 'inline-flex',
            height: '100%',
            marginTop,
            width,
            minWidth: width
        },
        input: {
            border: '0px solid transparent',
            height: `${fontSizeAdjustedHeight}px`
        },
        errorMessageWrapper: {
            alignSelf: 'center',
            lineHeight: `${themeValues.fontSize}px`,
            marginTop: `-${marginTop}px`,
            padding: `${themeValues.padding}px`
        },
        errorMessageTheme: {
            lineHeight: themeValues.lineHeight
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

const getStyles = gettingStyles(getThemeValues, getDefaultStyles, getRequiredStyles);

class TextField extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        defaultValue: PropTypes.string,
        errorText: PropTypes.string,
        fullWidth: PropTypes.bool,
        hintText: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        required: PropTypes.bool,
        theme: PropTypes.object,
        width: PropTypes.number,
        value: PropTypes.string
    };

    static defaultProps = {
        disabled: false,
        fullWidth: false,
        onBlur: () => {
        },
        onChange: () => {
        },
        onFocus: () => {
        },
        required: false,
        theme: {},
        width: 256
    };

    static themedStates = [
        'disabled',
        "hasError",
        'focused',
        'pending'
    ];
    static themeProps = {
        backgroundColor: PropTypes.string,
        border: PropTypes.string,
        borderRadius: PropTypes.number,
        boxShadow: PropTypes.string,
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
        backgroundColor: '#fff',
        border: '1px solid transparent',
        borderRadius: 0,
        boxShadow: 'none',
        fontFamily: 'Arial',
        fontSize: 16,
        hintTextColor: 'gray',
        lineHeight: 1.5,
        padding: 8,
        outline: '1px solid transparent',
        textColor: 'black',
        width: 256,
        focused: {
            outline: '1px solid transparent'
        },
        pending: {
            backgroundColor: '#fff'
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
        const {disabled, defaultValue, errorText, hintText, required, value} = this.props;
        const {hasValue} = this.state;
        const {prepareStyles} = this.context.theme;
        const styles = getStyles(this);

        return (
            <div style={prepareStyles(styles.root)}>
                <HintText ref="hintText" text={hintText} style={styles.hintText} hidden={hasValue}
                          onClick={this.focusInput} {...styles.hintTextProps} />
                <div style={prepareStyles(styles.inputWrapper)} ref="inputWrapper">
                    <input style={prepareStyles(styles.input)} type="text" ref="inputField" defaultValue={defaultValue} value={value} disabled={disabled}
                           onChange={this.handleChange}
                           onFocus={this.handleFocus}onBlur={this.handleBlur} />
                    <RequiredIndicator hidden={!required} style={styles.requiredIndicator} />
                </div>
                {errorText && <div style={prepareStyles(styles.errorMessageWrapper)}><ErrorMessage text={errorText} hidden={!errorText} theme={styles.errorMessageTheme} /></div>}
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
