'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _ThemeProvider = require('./../ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

var _Transitions = require('./../utilities/Transitions');

var Transitions = _interopRequireWildcard(_Transitions);

var _Opacity = require('./../utilities/Opacity');

var _component = require('./../utilities/component');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyles = function getStyles(props, context) {
    var hidden = props.hidden;
    var _context$theme = context.theme,
        errorPrimaryColor = _context$theme.errorPrimaryColor,
        basicFontFamily = _context$theme.basicFontFamily,
        smallFontSize = _context$theme.smallFontSize,
        normalLineHeight = _context$theme.normalLineHeight;


    return {
        text: {
            color: errorPrimaryColor,
            display: 'block',
            fontFamily: basicFontFamily,
            fontSize: smallFontSize + 'px',
            lineHeight: normalLineHeight,
            opacity: hidden ? _Opacity.hidden : _Opacity.fullyVisible,
            transition: Transitions.create('450ms', 'opacity', '0ms', 'cubic-bezier(0.23, 1, 0.32, 1)')
        }
    };
};

var ErrorMessage = function ErrorMessage(props, context) {
    var onClick = props.onClick,
        text = props.text;

    var handleClick = (0, _component.createEventHandler)(onClick);
    var styles = getStyles(props, context);

    return _react2.default.createElement(
        'div',
        { onClick: handleClick },
        _react2.default.createElement(
            'span',
            { style: styles.text },
            text
        )
    );
};
process.env.NODE_ENV !== "production" ? ErrorMessage.propTypes = {
    hidden: _react.PropTypes.bool,
    onClick: _react.PropTypes.func,
    text: _react.PropTypes.string
} : void 0;
ErrorMessage.defaultProps = {
    hidden: false,
    onClick: function onClick() {},
    text: ''
};
ErrorMessage.contextTypes = {
    theme: _react.PropTypes.shape(_ThemeProvider2.default.themeDefinition).isRequired
};
ErrorMessage.displayName = 'ErrorMessage';

exports.default = (0, _Radium2.default)(ErrorMessage);