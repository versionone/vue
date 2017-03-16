'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _colorFunctions = require('@andrew-codes/color-functions');

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _Transparent = require('./../utilities/Transparent');

var _Transparent2 = _interopRequireDefault(_Transparent);

var _Transitions = require('../utilities/Transitions');

var _colorManipulator = require('./../utilities/colorManipulator');

var _component = require('./../utilities/component');

var _Sizes = require('./Sizes');

var ButtonSizes = _interopRequireWildcard(_Sizes);

var _Types = require('./Types');

var ButtonTypes = _interopRequireWildcard(_Types);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var darkenInvert = function darkenInvert(foreground, background) {
    var inverseBasicColorMultiplier = 0.35;
    var darkenedColor = (0, _colorFunctions.toRgbaString)((0, _colorFunctions.darken)(background, inverseBasicColorMultiplier));
    return {
        ':hover': {
            background: darkenedColor,
            border: '1px solid ' + darkenedColor,
            color: foreground
        },
        background: background,
        border: '1px solid ' + background,
        color: foreground
    };
};
var getStylesBasedOnType = function getStylesBasedOnType(props, theme) {
    var altColor = theme.altColor,
        basicColor = theme.basicColor,
        importantColor = theme.importantColor,
        darkInverseColor = theme.darkInverseColor,
        lightInverseColor = theme.lightInverseColor,
        normalBackground = theme.normalBackground,
        textPrimaryColor = theme.textPrimaryColor;
    var disable = props.disable,
        type = props.type;

    var inverseColors = [darkInverseColor, lightInverseColor];

    if (disable) {
        var disabledColorOpacity = 0.3;
        var color = (0, _colorFunctions.toRgbaString)((0, _colorFunctions.setOpacity)(textPrimaryColor, disabledColorOpacity));
        return {
            ':hover': {
                background: normalBackground,
                color: color
            },
            background: normalBackground,
            border: '1px solid ' + _Transparent2.default,
            color: color
        };
    }
    if (type === ButtonTypes.basic) {
        return darkenInvert(darkInverseColor, basicColor);
    }
    if (type === ButtonTypes.important) {
        return darkenInvert(darkInverseColor, importantColor);
    }
    if (type === ButtonTypes.alt) {
        return darkenInvert(darkInverseColor, altColor);
    }
    if (type === ButtonTypes.basicAlt) {
        return {
            ':hover': {
                background: basicColor,
                border: '1px solid ' + basicColor,
                color: darkInverseColor
            },
            background: normalBackground,
            border: '1px solid ' + textPrimaryColor,
            color: textPrimaryColor
        };
    }

    if (type === ButtonTypes.special) {
        return {
            ':hover': {
                background: basicColor,
                border: '1px solid ' + basicColor,
                color: darkInverseColor
            },
            background: textPrimaryColor,
            border: '1px solid ' + textPrimaryColor,
            color: normalBackground
        };
    }

    var inverseBackground = (0, _colorManipulator.getForegroundForBackground)(normalBackground, inverseColors);
    var inverseForeground = (0, _colorManipulator.getForegroundForBackground)(inverseBackground, inverseColors);
    return {
        ':hover': {
            background: inverseBackground,
            color: inverseForeground
        },
        background: normalBackground,
        border: '1px solid ' + textPrimaryColor,
        color: textPrimaryColor
    };
};
var getStyles = function getStyles(props, theme) {
    var disable = props.disable,
        size = props.size;
    var normalRadius = theme.normalRadius,
        basicFontFamily = theme.basicFontFamily,
        bold = theme.bold,
        largeLineHeight = theme.largeLineHeight,
        smallFontSize = theme.smallFontSize;


    var fontSize = smallFontSize * size;
    var height = Math.ceil(fontSize * largeLineHeight);
    var borderRadiusMultiplier = 2;
    var borderRadius = normalRadius * borderRadiusMultiplier;
    var typeStyles = getStylesBasedOnType(props, theme);

    return {
        root: _extends({
            ':focus': {
                outline: 'none'
            },
            alignItems: 'flex-start',
            border: '1px solid ' + _Transparent2.default,
            borderRadius: borderRadius + 'px',
            boxSizing: 'border-box',
            cursor: disable ? 'not-allowed' : 'pointer',
            display: 'inline-block',
            fontFamily: basicFontFamily,
            fontSize: fontSize + 'px',
            fontWeight: bold,
            height: height + 'px',
            letterSpacing: '0.03em',
            lineHeight: '' + largeLineHeight,
            margin: '0',
            padding: '0 1em',
            textAlign: 'center',
            textShadow: 'none',
            transition: (0, _Transitions.create)('0.5s'),
            whiteSpace: 'no-wrap'
        }, typeStyles)
    };
};

var Button = function Button(props, context) {
    var disable = props.disable,
        onClick = props.onClick,
        text = props.text;

    var handleClick = (0, _component.createConditionalEventHandler)(!disable)(onClick);
    var styles = getStyles(props, context.theme);
    return _react2.default.createElement(
        'button',
        {
            style: styles.root,
            onClick: handleClick
        },
        text
    );
};
process.env.NODE_ENV !== "production" ? Button.propTypes = {
    /**
     * Disables the button from responding to event handlers
     */
    disable: _react.PropTypes.bool,
    /**
     * Click event handler; fired once a button is clicked
     */
    onClick: _react.PropTypes.func,
    /**
     * Numeric value used as a multiplier to the button's size; 0.75, 1, and 1.5 as examples
     */
    size: _react.PropTypes.number,
    /**
     * Text string displayed within Button
     */
    text: _react.PropTypes.string,
    /**
     * Type of button
     */
    type: _react.PropTypes.oneOf([ButtonTypes.standard, ButtonTypes.basic, ButtonTypes.important, ButtonTypes.alt, ButtonTypes.basicAlt, ButtonTypes.special])
} : void 0;
Button.defaultProps = {
    disable: false,
    onClick: function onClick() {},
    size: ButtonSizes.normal,
    text: '',
    type: ButtonTypes.standard
};
Button.contextTypes = {
    theme: _react.PropTypes.object.isRequired
};
Button.displayName = 'Button';

exports.default = (0, _Radium2.default)(Button);