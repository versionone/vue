import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import {findDOMNode} from 'react-dom';
import {withTheme} from './../Theme';
import HintText from './../internal/HintText';
import RequiredIndicator from './../internal/RequiredIndicator';
import ErrorMessage from './../internal/ErrorMessage';

class TextField extends Component {
    static propTypes = {
        /**
         * Text string to use for the default value
         */
        defaultValue: PropTypes.string,
        /**
         * Disables the text field
         */
        disabled: PropTypes.bool,
        /**
         * Error content to display
         */
        errorText: PropTypes.string,
        /**
         * If true, the field is 100% width
         */
        fullWidth: PropTypes.bool,
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
         * Indicate the text field is required for user input
         */
        required: PropTypes.bool,
        /**
         * Theme used to style the component
         */
        theme: PropTypes.shape({
            field: PropTypes.shape({
                background: PropTypes.string,
                border: PropTypes.string,
                borderRadius: PropTypes.number,
                boxShadow: PropTypes.string,
                color: PropTypes.string,
                font: CustomPropTypes.font.isRequired,
                lineHeight: PropTypes.number.isRequired,
                outline: PropTypes.string,
                padding: PropTypes.number.isRequired,
                disabled: PropTypes.shape({
                    border: PropTypes.string
                }),
                focused: PropTypes.shape({
                    boxShadow: PropTypes.string
                }),
                invalid: PropTypes.shape({
                    background: PropTypes.string,
                    border: PropTypes.string
                }),
                pending: PropTypes.shape({
                    background: PropTypes.string
                }),
            }),
            errorMessage: PropTypes.shape({
                color: PropTypes.string
            }),
            hintText: PropTypes.shape({
                color: PropTypes.string
            })
        }),
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
        defaultValue: '',
        disabled: false,
        fullWidth: false,
        onBlur: () => {
        },
        onChange: () => {
        },
        onFocus: () => {
        },
        required: false,
        width: 256
    };

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            hintTextHeight: 0,
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
        const styles = this.getStyles();

        return (
            <div style={styles.root}>
                <div style={styles.hintTextWrapper}>
                    <HintText ref="hintText" theme={styles.hintTextTheme} text={hintText} hidden={hasValue}
                              onClick={this.focusInput} />
                </div>
                <div style={styles.inputWrapper} ref="inputWrapper">
                    <input style={styles.input} type="text" ref="inputField"
                           defaultValue={defaultValue}
                           disabled={disabled}
                           onChange={this.handleChange} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                    {required && fullWidth && <RequiredIndicator style={styles.requiredIndicator} /> }
                </div>
                {required && !fullWidth && <RequiredIndicator style={styles.requiredIndicator} /> }
                {errorText && (
                    <div style={styles.errorMessageWrapper}>
                        <ErrorMessage text={errorText}
                                      hidden={!errorText}
                                      theme={styles.errorMessageTheme} />
                    </div>
                )}
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

    getStyles = () => {
        const {hintTextHeight, focused} = this.state;
        const {disabled, errorText, fullWidth, pending, required, width, theme} = this.props;
        const {
            background,
            border,
            borderRadius,
            boxShadow,
            color,
            font,
            lineHeight,
            outline,
            padding,
            disabled: {
                border: disabledBorder
            },
            focused: {
                boxShadow: focusedBoxShadow
            },
            invalid: {
                background: invalidBackground,
                border: invalidBorder,
                boxShadow: invalidBoxShadow
            },
            pending: {
                background: pendingBackground
            }
        } = theme.field;
        const {color: hintTextColor} = theme.hintText;
        const {color: errorTextColor} = theme.errorMessage;

        const borderHeight = 2;
        const paddingHeightMultiplier = 2;
        const paddingHeight = padding * paddingHeightMultiplier;

        const textHeight = Math.floor(font.size * lineHeight);
        const textFieldHeight = textHeight + paddingHeight + borderHeight;
        const isHintTextMultipleLines = hintTextHeight > textFieldHeight;
        const marginTop = isHintTextMultipleLines ? `${hintTextHeight - textHeight}px` : '0px';
        const hintTextWrapperHeight = isHintTextMultipleLines ? (hintTextHeight + paddingHeight + borderHeight) : textFieldHeight;
        const computedWidth = fullWidth ? '100%' : `${width}px`;

        return {
            root: {
                background: 'transparent',
                display: fullWidth ? 'block' : 'inline-flex',
                position: 'relative'
            },
            hintTextWrapper: {
                background: errorText ? invalidBackground : pending ? pendingBackground : background,
                boxShadow: errorText ? invalidBoxShadow : focused ? focusedBoxShadow : boxShadow,
                boxSizing: 'border-box',
                color,
                border: disabled ? disabledBorder : errorText ? invalidBorder : border,
                borderRadius,
                fontFamily: font.family,
                fontSize: font.size,
                height: `${hintTextWrapperHeight}px`,
                outline,
                padding: `${padding}px`,
                paddingRight: isHintTextMultipleLines && required ? '13px' : 0,
                position: 'absolute',
                top: 0,
                width: computedWidth
            },
            hintTextTheme: {
                hintText: {
                    color: hintTextColor,
                    lineHeight
                }
            },
            inputWrapper: {
                background: 'transparent',
                border: '1px solid transparent',
                boxSizing: 'border-box',
                display: 'inline-flex',
                height: '100%',
                marginTop,
                minWidth: computedWidth,
                padding: `${padding}px`,
                width: computedWidth
            },
            input: {
                background: 'rgba(0, 0, 0, 0)',
                border: '0px solid transparent',
                color,
                cursor: disabled ? 'not-allowed' : 'initial',
                flex: 1,
                fontFamily: font.family,
                fontSize: font.size,
                height: `${textHeight}px`,
                outline: 'none',
                padding: 0,
                position: 'relative',
                width: '100%'
            },
            requiredIndicator: {
                alignSelf: 'center',
                color: errorTextColor,
                fontSize: font.size,
                lineHeight,
                marginTop: !fullWidth ? marginTop : '0px',
                marginLeft: '6px'
            },
            errorMessageWrapper: {
                alignSelf: 'center',
                display: fullWidth && 'block',
                marginTop: 0,
                marginLeft: fullWidth ? 0 : '6px',
                padding: fullWidth && `${padding}px 0`
            },
            errorMessageTheme: {
                errorMessage: {
                    color: errorTextColor,
                    lineHeight
                }
            }
        };
    };
}

export const WithoutTheme = TextField;
export default withTheme()(TextField);