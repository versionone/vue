'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ErrorMessage = require('./../internal/ErrorMessage');

var _ErrorMessage2 = _interopRequireDefault(_ErrorMessage);

var _HintText = require('./../internal/HintText');

var _HintText2 = _interopRequireDefault(_HintText);

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _RequiredIndicator = require('./../internal/RequiredIndicator');

var _RequiredIndicator2 = _interopRequireDefault(_RequiredIndicator);

var _ThemeProvider = require('./../ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

var _Transparent = require('./../utilities/Transparent');

var _Transparent2 = _interopRequireDefault(_Transparent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextField = function (_Component) {
    _inherits(TextField, _Component);

    function TextField(props) {
        var _ref;

        _classCallCheck(this, TextField);

        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            rest[_key - 1] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, (_ref = TextField.__proto__ || Object.getPrototypeOf(TextField)).call.apply(_ref, [this, props].concat(rest)));

        _this.state = {
            focused: false,
            hasValue: !!props.defaultValue,
            hintTextHeight: 0
        };
        _this.handleBlur = _this.handleBlur.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleFocus = _this.handleFocus.bind(_this);
        _this.handleHintTextOnClick = _this.handleHintTextOnClick.bind(_this);
        _this.getHeight = _this.getHeight.bind(_this);
        _this.getStyles = _this.getStyles.bind(_this);
        _this.getBorderColor = _this.getBorderColor.bind(_this);
        _this.getHintTextWrapperBackground = _this.getHintTextWrapperBackground.bind(_this);
        _this.getHintTextBoxShadow = _this.getHintTextBoxShadow.bind(_this);
        return _this;
    }

    _createClass(TextField, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            this.setState({
                hintTextHeight: this.getHeight(this.props)
            });
        }
    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
            this.setState({
                hasValue: this.state.hasValue || Boolean(nextProps.defaultValue) || Boolean(nextProps.value),
                hintTextHeight: nextProps.hintText === this.props.hintText ? this.state.hintTextHeight : this.getHeight()
            });
        }
    }, {
        key: 'handleChange',
        value: function handleChange(evt) {
            this.setState({
                hasValue: !!evt.target.value
            });
            this.props.onChange(evt, evt.target.value);
        }
    }, {
        key: 'handleFocus',
        value: function handleFocus(evt) {
            this.setState({
                focused: true
            });
            this.props.onFocus(evt);
        }
    }, {
        key: 'handleBlur',
        value: function handleBlur(evt) {
            this.setState({
                focused: false
            });
            this.props.onBlur(evt);
        }
    }, {
        key: 'handleHintTextOnClick',
        value: function handleHintTextOnClick(evt) {
            this.handleFocus(evt);
            this.inputField.focus();
        }
    }, {
        key: 'getHeight',
        value: function getHeight() {
            var inputWrapperHeight = this.inputWrapper.getBoundingClientRect().height;
            var hintTextHeight = this.hintTextWrapper.getBoundingClientRect().height;
            return Math.max(inputWrapperHeight, hintTextHeight);
        }
    }, {
        key: 'getStyles',
        value: function getStyles() {
            var hintTextHeight = this.state.hintTextHeight;
            var _props = this.props,
                disabled = _props.disabled,
                fullWidth = _props.fullWidth,
                required = _props.required,
                width = _props.width;
            var _context$theme = this.context.theme,
                basicFontFamily = _context$theme.basicFontFamily,
                normalLineHeight = _context$theme.normalLineHeight,
                normalRadius = _context$theme.normalRadius,
                smallFontSize = _context$theme.smallFontSize,
                textPrimaryColor = _context$theme.textPrimaryColor,
                xxSmallGutter = _context$theme.xxSmallGutter;


            var borderHeight = 2;
            var paddingHeightMultiplier = 2;
            var paddingHeight = xxSmallGutter * paddingHeightMultiplier;
            var textHeight = Math.floor(smallFontSize * normalLineHeight);
            var textFieldHeight = textHeight + paddingHeight + borderHeight;
            var isHintTextMultipleLines = hintTextHeight > textFieldHeight;
            var marginTop = isHintTextMultipleLines ? hintTextHeight - textHeight + 'px' : '0px';
            var hintTextWrapperHeight = isHintTextMultipleLines ? hintTextHeight + paddingHeight + borderHeight : textFieldHeight;
            var computedWidth = fullWidth ? '100%' : width + 'px';
            var borderColor = this.getBorderColor();

            return {
                errorMessageWrapper: {
                    alignSelf: 'center',
                    display: fullWidth && 'block',
                    margin: '0 0 0 ' + (fullWidth ? '0px' : '6px'),
                    padding: fullWidth && xxSmallGutter + 'px 0'
                },
                hintTextWrapper: {
                    background: this.getHintTextWrapperBackground(),
                    border: '1px solid ' + borderColor,
                    borderRadius: normalRadius,
                    boxShadow: this.getHintTextBoxShadow(),
                    boxSizing: 'border-box',
                    height: hintTextWrapperHeight + 'px',
                    outline: 'none',
                    padding: xxSmallGutter + 'px ' + (isHintTextMultipleLines && required ? '13px' : '0px') + ' ' + xxSmallGutter + 'px ' + xxSmallGutter + 'px',
                    position: 'absolute',
                    top: 0,
                    width: computedWidth
                },
                input: {
                    background: 'rgba(0, 0, 0, 0)',
                    border: '0px solid ' + _Transparent2.default,
                    color: textPrimaryColor,
                    cursor: disabled ? 'not-allowed' : 'initial',
                    flex: 1,
                    fontFamily: basicFontFamily,
                    fontSize: smallFontSize + 'px',
                    height: textHeight + 'px',
                    outline: 'none',
                    padding: 0,
                    position: 'relative',
                    width: '100%'
                },
                inputWrapper: {
                    background: _Transparent2.default,
                    border: '1px solid ' + _Transparent2.default,
                    boxSizing: 'border-box',
                    display: 'inline-flex',
                    height: textFieldHeight + 'px',
                    marginTop: marginTop,
                    minWidth: computedWidth,
                    padding: xxSmallGutter + 'px',
                    width: computedWidth,
                    zIndex: '1'
                },
                requiredIndicatorWrapper: {
                    alignSelf: 'center',
                    margin: (fullWidth ? '0px' : marginTop) + ' 0 0 6px',
                    zIndex: '1'
                },
                root: {
                    background: _Transparent2.default,
                    display: fullWidth ? 'block' : 'inline-flex',
                    position: 'relative'
                }
            };
        }
    }, {
        key: 'getBorderColor',
        value: function getBorderColor() {
            var _props2 = this.props,
                disabled = _props2.disabled,
                errorText = _props2.errorText;
            var _context$theme2 = this.context.theme,
                disabledPrimaryColor = _context$theme2.disabledPrimaryColor,
                errorPrimaryColor = _context$theme2.errorPrimaryColor,
                fieldBorderColor = _context$theme2.fieldBorderColor;


            if (disabled) {
                return disabledPrimaryColor;
            } else if (errorText) {
                return errorPrimaryColor;
            }
            return fieldBorderColor;
        }
    }, {
        key: 'getHintTextWrapperBackground',
        value: function getHintTextWrapperBackground() {
            var _props3 = this.props,
                errorText = _props3.errorText,
                pending = _props3.pending;
            var _context$theme3 = this.context.theme,
                errorSecondaryColor = _context$theme3.errorSecondaryColor,
                normalBackground = _context$theme3.normalBackground,
                pendingPrimaryColor = _context$theme3.pendingPrimaryColor;


            if (errorText) {
                return errorSecondaryColor;
            } else if (pending) {
                return pendingPrimaryColor;
            }
            return normalBackground;
        }
    }, {
        key: 'getHintTextBoxShadow',
        value: function getHintTextBoxShadow() {
            var errorText = this.props.errorText;
            var focused = this.state.focused;
            var _context$theme4 = this.context.theme,
                errorSecondaryColor = _context$theme4.errorSecondaryColor,
                focusedSecondaryColor = _context$theme4.focusedSecondaryColor;

            if (errorText) {
                return '0 0 2px 2px ' + errorSecondaryColor;
            } else if (focused) {
                return '0 0 2px 2px ' + focusedSecondaryColor;
            }
            return 'none';
        }
    }, {
        key: 'render',
        value: function render() {
            var _this2 = this;

            var _props4 = this.props,
                disabled = _props4.disabled,
                defaultValue = _props4.defaultValue,
                errorText = _props4.errorText,
                fullWidth = _props4.fullWidth,
                hintText = _props4.hintText,
                required = _props4.required,
                value = _props4.value;
            var hasValue = this.state.hasValue;

            var inputValue = value ? {
                value: value
            } : {};

            var styles = this.getStyles();

            return _react2.default.createElement(
                'div',
                { style: styles.root },
                _react2.default.createElement(
                    'div',
                    { style: styles.hintTextWrapper },
                    _react2.default.createElement(
                        'div',
                        {
                            ref: function ref(el) {
                                _this2.hintTextWrapper = el;
                            }
                        },
                        _react2.default.createElement(_HintText2.default, {
                            hidden: hasValue,

                            text: hintText,
                            onClick: this.handleHintTextOnClick
                        })
                    )
                ),
                _react2.default.createElement(
                    'div',
                    {
                        ref: function ref(el) {
                            _this2.inputWrapper = el;
                        },
                        style: styles.inputWrapper
                    },
                    _react2.default.createElement('input', _extends({
                        defaultValue: defaultValue,
                        disabled: disabled
                    }, inputValue, {
                        ref: function ref(el) {
                            _this2.inputField = el;
                        },
                        style: styles.input,
                        type: 'text',
                        onBlur: this.handleBlur,
                        onChange: this.handleChange,
                        onFocus: this.handleFocus
                    })),
                    required && fullWidth && _react2.default.createElement(
                        'div',
                        { style: styles.requiredIndicatorWrapper },
                        _react2.default.createElement(_RequiredIndicator2.default, null)
                    )
                ),
                required && !fullWidth && _react2.default.createElement(
                    'div',
                    { style: styles.requiredIndicatorWrapper },
                    _react2.default.createElement(_RequiredIndicator2.default, null)
                ),
                errorText && _react2.default.createElement(
                    'div',
                    { style: styles.errorMessageWrapper },
                    _react2.default.createElement(_ErrorMessage2.default, {
                        hidden: !errorText,
                        text: errorText
                    })
                )
            );
        }
    }]);

    return TextField;
}(_react.Component);

TextField.defaultProps = {
    defaultValue: '',
    disabled: false,
    fullWidth: false,
    hintText: '',
    onBlur: function onBlur() {},
    onChange: function onChange() {},
    onFocus: function onFocus() {},
    pending: false,
    required: false,
    width: 256
};
TextField.contextTypes = {
    theme: _react.PropTypes.shape(_ThemeProvider2.default.themeDefinition).isRequired
};
process.env.NODE_ENV !== "production" ? TextField.propTypes = {
    /**
     * Text string to use for the default value
     */
    defaultValue: _react.PropTypes.string,
    /**
     * Disables the text field
     */
    disabled: _react.PropTypes.bool,
    /**
     * Error content to display
     */
    errorText: _react.PropTypes.string,
    /**
     * If true, the field is 100% width
     */
    fullWidth: _react.PropTypes.bool,
    /**
     * Placeholder text
     */
    hintText: _react.PropTypes.string,
    /**
     * Callback fired when text field looses focus
     */
    onBlur: _react.PropTypes.func,
    /**
     * Callback fired when text field value changes
     */
    onChange: _react.PropTypes.func,
    /**
     * Callback fired when text field is focused
     */
    onFocus: _react.PropTypes.func,
    /**
     * Text field state; used when value has changed, but not persisted
     */
    pending: _react.PropTypes.bool,
    /**
     * Indicate the text field is required for user input
     */
    required: _react.PropTypes.bool,
    /**
     * Explicitly sets the value of TextField
     */
    value: _react.PropTypes.string,
    /**
     * Width of the text field
     */
    width: _react.PropTypes.number
} : void 0;
exports.default = (0, _Radium2.default)(TextField);