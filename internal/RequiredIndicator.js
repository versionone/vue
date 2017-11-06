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

var getStyles = function getStyles(props, context) {
    var hidden = props.hidden;
    var _context$theme = context.theme,
        requiredPrimaryColor = _context$theme.requiredPrimaryColor,
        normalLineHeight = _context$theme.normalLineHeight,
        smallFontSize = _context$theme.smallFontSize;

    var zIndex = 1;

    return {
        root: {
            alignSelf: 'center',
            color: requiredPrimaryColor,
            fontSize: smallFontSize + 'px',
            lineHeight: normalLineHeight,
            opacity: hidden ? _Opacity.hidden : _Opacity.fullyVisible,
            zIndex: zIndex
        }
    };
};

var defaultProps = {
    hidden: false
};
var RequiredIndicator = function RequiredIndicator(props, context) {
    var propsWithDefaults = _extends({}, defaultProps, props);
    var styles = getStyles(propsWithDefaults, context);

    return _react2.default.createElement(
        'div',
        { style: styles.root },
        '*'
    );
};
process.env.NODE_ENV !== "production" ? RequiredIndicator.propTypes = {
    hidden: _react.PropTypes.bool
} : void 0;
RequiredIndicator.contextTypes = {
    theme: _react.PropTypes.shape(_ThemeProvider2.default.themeDefinition).isRequired
};
RequiredIndicator.displayName = 'RequiredIndicator';

exports.default = (0, _Radium2.default)(RequiredIndicator);