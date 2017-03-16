'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Opacity = require('./../utilities/Opacity');

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _ThemeProvider = require('./../ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var getStyles = function getStyles(props, context) {
    var hidden = props.hidden;
    var _context$theme = context.theme,
        basicFontFamily = _context$theme.basicFontFamily,
        smallFontSize = _context$theme.smallFontSize,
        normalLineHeight = _context$theme.normalLineHeight,
        textSecondaryColor = _context$theme.textSecondaryColor;


    return {
        root: {
            boxSizing: 'border-box',
            width: '100%'
        },
        text: {
            color: textSecondaryColor,
            display: 'block',
            fontFamily: basicFontFamily,
            fontSize: smallFontSize + 'px',
            lineHeight: normalLineHeight,
            opacity: hidden ? _Opacity.hidden : _Opacity.fullyVisible,
            transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
        }
    };
};
var defaultProps = {
    hidden: false,
    onClick: function onClick() {},
    text: ''
};
var HintText = function HintText(props, context) {
    var propsWithDefaults = _extends({}, defaultProps, props);

    var text = propsWithDefaults.text,
        hidden = propsWithDefaults.hidden,
        rest = _objectWithoutProperties(propsWithDefaults, ['text', 'hidden']);

    var styles = getStyles(propsWithDefaults, context);

    return _react2.default.createElement(
        'div',
        _extends({
            style: styles.root
        }, rest),
        _react2.default.createElement(
            'span',
            { style: styles.text },
            text
        )
    );
};
process.env.NODE_ENV !== "production" ? HintText.propTypes = {
    hidden: _react.PropTypes.bool,
    onClick: _react.PropTypes.func,
    text: _react.PropTypes.string
} : void 0;
HintText.contextTypes = {
    theme: _react.PropTypes.shape(_ThemeProvider2.default.themeDefinition).isRequired
};
HintText.displayName = 'HintText';

exports.default = (0, _Radium2.default)(HintText);