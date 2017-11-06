'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _colorFunctions = require('@andrew-codes/color-functions');

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _ThemeProvider = require('./../ThemeProvider');

var _ThemeProvider2 = _interopRequireDefault(_ThemeProvider);

var _component = require('./../utilities/component');

var _IconButton = require('./../IconButton');

var _IconButton2 = _interopRequireDefault(_IconButton);

var _Icons = require('./../Icons');

var _Sizes = require('./../Button/Sizes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyles = function getStyles(props, context) {
    var backgroundColor = props.backgroundColor,
        color = props.color,
        fontSize = props.fontSize,
        fullWidth = props.fullWidth,
        lineHeight = props.lineHeight,
        width = props.width;
    var _context$theme = context.theme,
        basicFontFamily = _context$theme.basicFontFamily,
        normalRadius = _context$theme.normalRadius,
        smallGutter = _context$theme.smallGutter,
        xxSmallGutter = _context$theme.xxSmallGutter;


    return {
        buttonWrapper: {
            display: 'flex',
            marginLeft: fontSize + 'px'
        },
        root: {
            backgroundColor: backgroundColor,
            borderRadius: normalRadius + 'px',
            boxSizing: 'border-box',
            color: color,
            display: 'flex',
            fontSize: fontSize + 'px',
            lineHeight: '' + lineHeight,
            margin: xxSmallGutter + 'px',
            padding: smallGutter + 'px',
            width: fullWidth ? '100%' : width + 'px'
        },
        text: {
            alignSelf: 'center',
            flex: 1,
            fontFamily: basicFontFamily
        },
        wrapper: {
            alignSelf: 'center',
            display: 'flex',
            width: '100%'
        }
    };
};

var Chip = function Chip(props, context) {
    var backgroundColor = props.backgroundColor,
        color = props.color,
        fontSize = props.fontSize,
        fullWidth = props.fullWidth,
        oid = props.oid,
        onRequestRemove = props.onRequestRemove,
        text = props.text,
        width = props.width;

    var styles = getStyles({
        backgroundColor: backgroundColor,
        color: color,
        fontSize: fontSize,
        fullWidth: fullWidth,
        width: width
    }, context);
    var iconButtonDarkenCoefficient = 0.45;
    var handleClick = (0, _component.createEventHandler)(onRequestRemove, oid);

    return _react2.default.createElement(
        'div',
        { style: styles.root },
        _react2.default.createElement(
            'div',
            { style: styles.wrapper },
            _react2.default.createElement(
                'span',
                { style: styles.text },
                text
            ),
            _react2.default.createElement(
                'div',
                { style: styles.buttonWrapper },
                _react2.default.createElement(_IconButton2.default, {
                    circle: true,
                    color: (0, _colorFunctions.toRgbaString)((0, _colorFunctions.darken)(backgroundColor, iconButtonDarkenCoefficient)),
                    icon: _Icons.CloseIcon,
                    size: _Sizes.xxSmall,
                    onClick: handleClick
                })
            )
        )
    );
};
process.env.NODE_ENV !== "production" ? Chip.propTypes = {
    /**
     * Background color of the chip
     */
    backgroundColor: _react.PropTypes.string,
    /**
     * Font color of the chip
     */
    color: _react.PropTypes.string,
    /**
     * Font size used for the text of the Chip
     */
    fontSize: _react.PropTypes.number,
    /**
     * The Chip will expand to fill the container's space if true; otherwise it will inline-block like with a width
     */
    fullWidth: _react.PropTypes.bool,
    /**
     * Line height for the text of the Chip
     */
    lineHeight: _react.PropTypes.number,
    /**
     * Unique identifier for this Chip
     */
    oid: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
    /**
     * Function handling the clicking of the close icon of the Chip
     */
    onRequestRemove: _react.PropTypes.func,
    /**
     * The text to render on the Chip
     */
    text: _react.PropTypes.string.isRequired,
    /**
     * Width of the Chip
     */
    width: _react.PropTypes.number
} : void 0;
Chip.defaultProps = {
    backgroundColor: '#ccc',
    color: '#000',
    fontSize: 14,
    fullWidth: false,
    lineHeight: 1,
    onRequestRemove: function onRequestRemove() {},
    width: 200
};
Chip.contextTypes = {
    theme: _react.PropTypes.shape(_ThemeProvider2.default.themeDefinition).isRequired
};
Chip.displayName = 'Chip';
exports.default = (0, _Radium2.default)(Chip);