import React, {Component, PropTypes} from 'react';
import {findDOMNode} from 'react-dom';
import Radium from 'radium';
import HintText from './../internal/HintText';
import RequiredIndicator from './../internal/RequiredIndicator';
import ErrorMessage from './../internal/ErrorMessage';
import {decomposeColor} from './../styles/colorManipulator';


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
    static contextTypes = {
        theme: PropTypes.shape({
            typography: PropTypes.shape({
                basicFamily: PropTypes.string,
                small: PropTypes.number.isRequired,
                lineHeightNormal: PropTypes.number.isRequired
            }).isRequired,
            spacing: PropTypes.shape({
                xxSmallGutter: PropTypes.number.isRequired
            }),
            color: PropTypes.shape({
                transparent: PropTypes.string,
                textPrimary: PropTypes.string,
                focusedPrimary: PropTypes.string,
                disabledPrimary: PropTypes.string,
                errorPrimary: PropTypes.string,
                errorSecondary: PropTypes.string,
                pendingPrimary: PropTypes.string,
                normalBackground: PropTypes.string,
                fieldBorder: PropTypes.string
            }),
            border: PropTypes.shape({
                normalRadius: PropTypes.number
            })
        }),
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
                    <HintText ref="hintText" text={hintText} hidden={hasValue}
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
                                      hidden={!errorText} />
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
        const {disabled, errorText, fullWidth, pending, required, width} = this.props;
        const {
            typography: {
                basicFamily,
                small,
                lineHeightNormal
            },
            spacing: {
                xxSmallGutter
            },
            color: {
                transparent,
                textPrimary,
                focusedPrimary,
                disabledPrimary,
                errorPrimary,
                errorSecondary,
                pendingPrimary,
                normalBackground,
                fieldBorder
            },
            border: {
                normalRadius
            }
        } = this.context.theme;

        const borderHeight = 2;
        const paddingHeightMultiplier = 2;
        const paddingHeight = xxSmallGutter * paddingHeightMultiplier;

        const textHeight = Math.floor(small * lineHeightNormal);
        const textFieldHeight = textHeight + paddingHeight + borderHeight;
        const isHintTextMultipleLines = hintTextHeight > textFieldHeight;
        const marginTop = isHintTextMultipleLines ? `${hintTextHeight - textHeight}px` : '0px';
        const hintTextWrapperHeight = isHintTextMultipleLines ? (hintTextHeight + paddingHeight + borderHeight) : textFieldHeight;
        const computedWidth = fullWidth ? '100%' : `${width}px`;

        const borderColor = disabled ? disabledPrimary : errorText ? errorPrimary : fieldBorder;
        return {
            root: {
                background: transparent,
                display: fullWidth ? 'block' : 'inline-flex',
                position: 'relative'
            },
            hintTextWrapper: {
                background: errorText ? errorSecondary : pending ? pendingPrimary : normalBackground,
                boxShadow: errorText ? `0 0 2px 2px ${errorSecondary}` : focused ? `0 0 2px 2px ${focusedPrimary}` : 'none',
                boxSizing: 'border-box',
                border: `1px solid ${borderColor}`,
                borderRadius: normalRadius,
                height: `${hintTextWrapperHeight}px`,
                outline: 'none',
                padding: `${xxSmallGutter}px ${isHintTextMultipleLines && required ? '13px' : 0} ${xxSmallGutter}px ${xxSmallGutter}px`,
                position: 'absolute',
                top: 0,
                width: computedWidth
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
            requiredIndicator: {
                alignSelf: 'center',
                color: errorPrimary,
                fontSize: small,
                lineHeight: lineHeightNormal,
                margin: `${!fullWidth ? marginTop : '0px'} 0 0 6px`
            },
            errorMessageWrapper: {
                alignSelf: 'center',
                display: fullWidth && 'block',
                margin: `0 0 0 ${fullWidth ? 0 : '6px'}`,
                padding: fullWidth && `${xxSmallGutter}px 0`
            }
        };
    };
}

export default Radium(TextField);