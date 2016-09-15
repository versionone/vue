import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import * as CustomPropTypes from './../utilities/PropTypes';
import HintText from '../shared/HintText';
import RequiredIndicator from '../shared/RequiredIndicator';
import mergeStyles from './../Theme/mergeStyles';

// TODO: pull out into theme/css/etc.
// Things that should probably go in a theme
const height = 48;
const fontSize = 16;
const fontFamily = 'Arial';
const textFieldHeight = 24;

// TODO: This can be a utility function
const getThemeStyles = (defaultThemeValues, themeStyles, state) => {
    // Themed styles based on state
    const focusedStyles = state.isFocused ? {...defaultThemeValues.focused, ...(themeStyles.focused || {})} : {};

    // Compose default theme values, then theme, then state based theme values;
    return {
        ...defaultThemeValues,
        ...themeStyles,
        ...focusedStyles
    };
};

const getDefaultStyles = (themeStyles, props) => ({
    root: {
        position: 'relative',
        width: props.fullWidth ? '100%' : props.width ? `${props.width}px` : `${themeStyles.width}px`,
        height: `${height}px`,
        lineHeight: `${textFieldHeight}px`,
        display: 'inline-block',
        transition: 'height 200ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    },
    hintText: {
        fontFamily,
        fontSize: `${fontSize}px`,
        border: themeStyles.border
    },
    inputWrapper: {
        backgroundColor: themeStyles.backgroundColor,
        outline: themeStyles.outline,
        padding: `${themeStyles.padding}px`
    },
    input: {
        flex: 1,
        width: '100%',
        background: 'rgba(0, 0, 0, 0)',
        border: '1px solid transparent',
        fontFamily,
        fontSize: `${fontSize}px`,
        position: 'relative',
        cursor: props.disabled ? 'not-allowed' : 'initial',
        outline: 'none'
    },
    requiredIndicator: {
        alignSelf: 'center'
    }
});

const getRequiredStyles = (themeStyles, props, state) => {
    const hintTextOffset = state.hintTextHeight - textFieldHeight - (2 * themeStyles.padding);
    return {
        root: {marginTop: hintTextOffset > 0 ? `${textFieldHeight}px` : 0},
        hintText: {
            position: 'absolute',
            top: hintTextOffset > 0 ? `-${hintTextOffset}px` : 0,
            padding: `${themeStyles.padding}px`,
            backgroundColor: themeStyles.backgroundColor,
            boxSizing: 'border-box',
            width: '100%'
        },
        inputWrapper: {
            display: 'flex'
        }
    };
};

const getCustomStyles = (props) => ({
    hintText: props.hintTextStyle
});

const getStyles = (defaultThemeValues, theme, props, state) => {
    // Theme styles to be used when generating default and required styles.
    const themeStyles = getThemeStyles(defaultThemeValues, theme.TextField, state);

    // Default, custom, required styles
    const defaultStyles = getDefaultStyles(themeStyles, props, state);
    const customStyles = getCustomStyles(props);
    const requiredStyles = getRequiredStyles(themeStyles, props, state);

    const styles = mergeStyles(defaultStyles, customStyles, requiredStyles);
    return theme.prepareStyles(styles);
};

class TextEntryField extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        fullWidth: PropTypes.bool,
        hintText: PropTypes.string,
        hintTextStyle: CustomPropTypes.style,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        required: PropTypes.bool,
        width: PropTypes.number,
        value: PropTypes.string
    };

    static defaultProps = {
        disabled: false,
        fullWidth: false,
        hintTextStyle: {},
        onBlur: () => {
        },
        onChange: () => {
        },
        onFocus: () => {
        },
        required: false,
        width: 256,
        value: ''
    };

    static themedStates = ['focused'];
    static themeProps = {
        backgroundColor: PropTypes.string,
        border: PropTypes.string,
        padding: PropTypes.number,
        outline: PropTypes.string,
        width: PropTypes.number
    };
    static defaultThemeProps = {
        backgroundColor: 'transparent',
        border: '1px solid transparent',
        padding: 6,
        outline: '1px solid transparent',
        width: 256,
        focused: {
            outline: '1px solid blue'
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
            isFocused: false
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
        const styles = getStyles(TextEntryField.defaultThemeProps, this.context.theme, this.props, this.state);
        const {disabled, value, hintText, required} = this.props;
        const {hasValue} = this.state;

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
            isFocused: true
        });
        this.props.onFocus(evt);
    };

    handleBlur = (evt) => {
        this.setState({
            isFocused: false
        });
        this.props.onBlur(evt);
    };

    focusInput = () => {
        this.refs.inputField.focus();
    };
}
export default TextEntryField;
