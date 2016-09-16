import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import * as CustomPropTypes from './../utilities/PropTypes';
import HintText from '../shared/HintText';
import RequiredIndicator from '../shared/RequiredIndicator';
import themedComponent from './../Theme/themedComponent';

// TODO: pull out into theme/css/etc.
// Things that should probably go in a theme
const height = 48;
const fontSize = 16;
const fontFamily = 'Arial';
const textFieldHeight = 24;

const getThemeStyles = (defaultThemeValues, {TextField}, props, state) => {
    // Themed styles based on state
    const focusedStyles = state.focused ? {...defaultThemeValues.focused, ...(TextField.focused || {})} : {};
    const pendingStyles = props.pending ? {...defaultThemeValues.pending, ...(TextField.pending || {})} : {};
    // Compose default theme values, then theme, then state based theme values;
    return {
        ...defaultThemeValues,
        ...TextField,
        ...focusedStyles,
        ...pendingStyles
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
        border: themeStyles.border,
        outline: themeStyles.outline
    },
    inputWrapper: {
        backgroundColor: themeStyles.backgroundColor,
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

class TextEntryField extends Component {
    static propTypes = {
        disabled: PropTypes.bool,
        fullWidth: PropTypes.bool,
        hintText: PropTypes.string,
        onBlur: PropTypes.func,
        onChange: PropTypes.func,
        onFocus: PropTypes.func,
        required: PropTypes.bool,
        width: PropTypes.number,
        value: PropTypes.string,
        styles: PropTypes.shape({
            root: CustomPropTypes.style,
            hintText: CustomPropTypes.style,
            inputWrapper: CustomPropTypes.style,
            input: CustomPropTypes.style,
            requiredIndicator: CustomPropTypes.style
        })
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
        width: 256,
        value: '',
        styles: {
            root: {},
            hintText: {},
            inputWrapper: {},
            input: {},
            requiredIndicator: {}
        }
    };

    static themedStates = ['focused', 'pending'];
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
        // const styles = getStyles(TextEntryField.defaultThemeProps, this.context.theme, this.props, this.state);
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

    focusInput = () => {
        this.refs.inputField.focus();
    };
}
export default themedComponent(getThemeStyles, getDefaultStyles, getRequiredStyles)(TextEntryField);
