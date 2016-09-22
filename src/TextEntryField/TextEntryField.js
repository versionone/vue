import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import * as CustomPropTypes from './../utilities/PropTypes';
import HintText from './../internal/HintText';
import RequiredIndicator from './../internal/RequiredIndicator';
import themedComponent from './../Theme/themedComponent';
import mergeStyles from './../Theme/mergeStyles';

// TODO: pull out into theme/css/etc.
// Things that should probably go in a theme

const getThemeValues = (defaultThemeValues, {TextField}, props, state) => {
    // Themed styles based on state
    const focusedStyles = state.focused ? {...defaultThemeValues.focused, ...(TextField.focused || {})} : {};
    const pendingStyles = props.pending ? {...defaultThemeValues.pending, ...(TextField.pending || {})} : {};
    const disabledStyles = props.disabled ? {...defaultThemeValues.disabled, ...(TextField.disabled || {})} : {};
    // Compose default theme values, then theme, then state based theme values;
    return mergeStyles(
        defaultThemeValues,
        TextField,
        focusedStyles,
        pendingStyles,
        disabledStyles
    );
};

const getDefaultStyles = (themeValues, props) => ({
    root: {
        position: 'relative',
        display: 'inline-block',
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
        color: themeValues.textColor,
        flex: 1,
        width: '100%',
        background: 'rgba(0, 0, 0, 0)',
        border: '1px solid transparent',
        fontFamily: themeValues.fontFamily,
        fontSize: `${themeValues.fontSize}px`,
        position: 'relative',
        cursor: props.disabled ? 'not-allowed' : 'initial',
        outline: 'none'
    },
    requiredIndicator: {
        alignSelf: 'center'
    }
});

const getRequiredStyles = (themeValues, props, state) => {
    const height = themeValues.height;
    const lineHeight = height - themeValues.fontSize;
    const hintTextOffset = height - state.hintTextHeight;
    const marginTop = hintTextOffset < 0 ? `${Math.abs(hintTextOffset)}px` : 0;
    const width = props.fullWidth ? '100%' : props.width ? `${props.width}px` : `${themeValues.width}px`;

    return {
        root: {
            background: 'transparent',
            height: `${height}px`,
            lineHeight: `${lineHeight}px`,
            marginTop,
            width
        },
        hintText: {
            backgroundColor: themeValues.backgroundColor,
            boxShadow: themeValues.boxShadow,
            boxSizing: 'border-box',
            position: 'absolute',
            top: hintTextOffset < 0 ? `${hintTextOffset}px` : 0,
            width: '100%'
        },
        inputWrapper: {
            background: 'transparent',
            boxSizing: 'border-box',
            display: 'flex',
            height: '100%'
        }
    };
};

class TextEntryField extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
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
        width: 256,
        value: ''
    };

    static themedStates = [
        'disabled',
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
        height: PropTypes.number,
        hintTextColor: PropTypes.string,
        padding: PropTypes.number,
        outline: PropTypes.string,
        textColor: PropTypes.string,
        width: PropTypes.number
    };
    static defaultThemeProps = {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        borderRadius: 0,
        boxShadow: 'none',
        fontFamily: 'Arial',
        fontSize: 16,
        height: 48,
        hintTextColor: 'gray',
        padding: 8,
        outline: '1px solid transparent',
        textColor: 'black',
        width: 256,
        focused: {
            outline: '1px solid transparent'
        },
        pending: {
            backgroundColor: 'transparent'
        }
    };

    static contextTypes = {
        theme: CustomPropTypes.theme
    };

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            hintTextHeight: 24,
            hasValue: !!props.value,
            focused: false
        };
    }

    componentDidMount() {
        this.setState({
            hintTextHeight: findDOMNode(this.refs.hintText).getBoundingClientRect().height
        });
    }

    componentDidReceiveProps(nextProps) {
        this.setState({
            hasValue: !!nextProps.value,
            hintTextHeight: findDOMNode(this.refs.hintText).getBoundingClientRect().height
        });
    }

    render() {
        const {disabled, value, hintText, required} = this.props;
        const {hasValue} = this.state;
        const styles = this.getStyles(this);

        return (
            <div style={styles.root}>
                <HintText ref="hintText" text={hintText} style={styles.hintText} hidden={hasValue}
                          onClick={this.focusInput} />
                <div style={styles.inputWrapper} ref="inputWrapper">
                    <input style={styles.input} type="text" ref="inputField" defaultValue={value}
                           onChange={this.handleChange}
                           disabled={disabled} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                    <RequiredIndicator hidden={!required} style={styles.requiredIndicator} />
                </div>
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
export default themedComponent(getThemeValues, getDefaultStyles, getRequiredStyles)(TextEntryField);
