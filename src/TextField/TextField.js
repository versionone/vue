import React, {Component, PropTypes} from 'react';
import ErrorMessage from './../internal/ErrorMessage';
import HintText from './../internal/HintText';
import Radium from './../utilities/Radium';
import RequiredIndicator from './../internal/RequiredIndicator';

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
         * Text field state; used when value has changed, but not persisted
         */
        pending: PropTypes.bool,
        /**
         * Indicate the text field is required for user input
         */
        required: PropTypes.bool,
        /**
         * Width of the text field
         */
        width: PropTypes.number,
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
        onFocus: PropTypes.func
    };
    static defaultProps = {
        defaultValue: '',
        disabled: false,
        fullWidth: false,
        hintText: '',
        onBlur: () => {
        },
        onChange: () => {
        },
        onFocus: () => {
        },
        pending: false,
        required: false,
        width: 256
    };
    static contextTypes = {
        theme: PropTypes.shape({
            border: PropTypes.shape({normalRadius: PropTypes.number}),
            color: PropTypes.shape({
                disabledPrimary: PropTypes.string,
                errorPrimary: PropTypes.string,
                errorSecondary: PropTypes.string,
                fieldBorder: PropTypes.string,
                focusedSecondary: PropTypes.string,
                normalBackground: PropTypes.string,
                pendingPrimary: PropTypes.string,
                textPrimary: PropTypes.string,
                transparent: PropTypes.string
            }),
            spacing: PropTypes.shape({xxSmallGutter: PropTypes.number.isRequired}),
            typography: PropTypes.shape({
                basicFamily: PropTypes.string,
                lineHeightNormal: PropTypes.number.isRequired,
                small: PropTypes.number.isRequired
            }).isRequired
        })
    };

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            focused: false,
            hasValue: !!props.defaultValue,
            hintTextHeight: 0
        };
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleHintTextOnClick = this.handleHintTextOnClick.bind(this);
        this.getHeight = this.getHeight.bind(this);
        this.getStyles = this.getStyles.bind(this);
        this.getBorderColor = this.getBorderColor.bind(this);
        this.getHintTextWrapperBackground = this.getHintTextWrapperBackground.bind(this);
        this.getHintTextBoxShadow = this.getHintTextBoxShadow.bind(this);
    }

    componentDidMount() {
        this.setState({hintTextHeight: this.getHeight(this.props)});
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            hasValue: this.state.hasValue || !!nextProps.defaultValue,
            hintTextHeight: this.getHeight()
        });
    }

    handleChange(evt) {
        this.setState({hasValue: !!evt.target.value});
        this.props.onChange(evt.target.value);
    }

    handleFocus(evt) {
        this.setState({focused: true});
        this.props.onFocus(evt);
    }

    handleBlur(evt) {
        this.setState({focused: false});
        this.props.onBlur(evt);
    }

    handleHintTextOnClick(evt) {
        this.handleFocus(evt);
        this.inputField.focus();
    }

    getHeight() {
        const inputWrapperHeight = this.inputWrapper
            .getBoundingClientRect()
            .height;
        const hintTextHeight = this.hintText.getBoundingClientRect().height;
        return Math.max(inputWrapperHeight, hintTextHeight);
    }

    getStyles() {
        const {hintTextHeight} = this.state;
        const {disabled, fullWidth, required, width} = this.props;
        const {
            typography: {
                basicFamily,
                small,
                lineHeightNormal
            },
            spacing: {xxSmallGutter},
            color: {
                transparent,
                textPrimary
            },
            border: {normalRadius}
        } = this.context.theme;

        const borderHeight = 2;
        const paddingHeightMultiplier = 2;
        const paddingHeight = xxSmallGutter * paddingHeightMultiplier;

        const textHeight = Math.floor(small * lineHeightNormal);
        const textFieldHeight = textHeight + paddingHeight + borderHeight;
        const isHintTextMultipleLines = hintTextHeight > textFieldHeight;
        const marginTop = isHintTextMultipleLines ? `${hintTextHeight - textHeight}px` : '0px';
        const hintTextWrapperHeight = isHintTextMultipleLines
            ? (hintTextHeight + paddingHeight + borderHeight)
            : textFieldHeight;
        const computedWidth = fullWidth ? '100%' : `${width}px`;
        const borderColor = this.getBorderColor();

        return {
            errorMessageWrapper: {
                alignSelf: 'center',
                display: fullWidth && 'block',
                margin: `0 0 0 ${fullWidth ? '0px' : '6px'}`,
                padding: fullWidth && `${xxSmallGutter}px 0`
            },
            hintTextWrapper: {
                background: this.getHintTextWrapperBackground(),
                border: `1px solid ${borderColor}`,
                borderRadius: normalRadius,
                boxShadow: this.getHintTextBoxShadow(),
                boxSizing: 'border-box',
                height: `${hintTextWrapperHeight}px`,
                outline: 'none',
                padding: `${xxSmallGutter}px ${isHintTextMultipleLines && required ? '13px' : '0px'} ${xxSmallGutter}px ${xxSmallGutter}px`,
                position: 'absolute',
                top: 0,
                width: computedWidth
            },
            input: {
                background: 'rgba(0, 0, 0, 0)',
                border: `0px solid ${transparent}`,
                color: textPrimary,
                cursor: disabled ? 'not-allowed' : 'initial',
                flex: 1,
                fontFamily: basicFamily,
                fontSize: small,
                height: `${textHeight}px`,
                outline: 'none',
                padding: 0,
                position: 'relative',
                width: '100%'
            },
            inputWrapper: {
                background: transparent,
                border: `1px solid ${transparent}`,
                boxSizing: 'border-box',
                display: 'inline-flex',
                height: '100%',
                marginTop,
                minWidth: computedWidth,
                padding: `${xxSmallGutter}px`,
                width: computedWidth
            },
            requiredIndicatorWrapper: {
                alignSelf: 'center',
                margin: `${fullWidth ? '0px' : marginTop} 0 0 6px`
            },
            root: {
                background: transparent,
                display: fullWidth ? 'block' : 'inline-flex',
                position: 'relative'
            }
        };
    }

    getBorderColor() {
        const {
            color: {
                disabledPrimary,
                errorPrimary,
                fieldBorder
            }
        } = this.context.theme;
        const {
            disabled,
            errorText
        } = this.props;

        if (disabled) {
            return disabledPrimary;
        }
        else if (errorText) {
            return errorPrimary;
        }
        return fieldBorder;
    }

    getHintTextWrapperBackground() {
        const {
            errorText,
            pending
        } = this.props;
        const {
            color: {
                errorSecondary,
                normalBackground,
                pendingPrimary
            }
        } = this.context.theme;

        if (errorText) {
            return errorSecondary;
        }
        else if (pending) {
            return pendingPrimary;
        }
        return normalBackground;
    }

    getHintTextBoxShadow() {
        const {errorText} = this.props;
        const {focused} = this.state;
        const {
            color: {
                errorSecondary,
                focusedSecondary
            }
        } = this.context.theme;
        if (errorText) {
            return `0 0 2px 2px ${errorSecondary}`;
        }
        else if (focused) {
            return `0 0 2px 2px ${focusedSecondary}`;
        }
        return 'none';
    }

    render() {
        const {disabled, defaultValue, errorText, fullWidth, hintText, required} = this.props;
        const {hasValue} = this.state;
        const styles = this.getStyles();

        return (
            <div style={styles.root}>
                <div style={styles.hintTextWrapper}>
                    <HintText
                        hidden={hasValue}
                        ref={(el) => {
                            this.hintText = el;
                        }}
                        text={hintText}
                        onClick={this.handleHintTextOnClick}
                    />
                </div>
                <div
                    ref={(el) => {
                        this.inputWrapper = el;
                    }}
                    style={styles.inputWrapper}
                >
                    <input
                        defaultValue={defaultValue}
                        disabled={disabled}
                        ref={(el) => {
                            this.inputField = el;
                        }}
                        style={styles.input}
                        type="text"
                        onBlur={this.handleBlur}
                        onChange={this.handleChange}
                        onFocus={this.handleFocus}
                    />
                    {required && fullWidth && (
                        <div style={styles.requiredIndicatorWrapper}>
                            <RequiredIndicator />
                        </div>
                    )}
                </div>
                {required && !fullWidth && (
                    <div style={styles.requiredIndicatorWrapper}>
                        <RequiredIndicator />
                    </div>
                )}
                {errorText && (
                    <div style={styles.errorMessageWrapper}>
                        <ErrorMessage
                            hidden={!errorText}
                            text={errorText}
                        />
                    </div>
                )}
            </div>
        );
    }
}
export default Radium(TextField);
