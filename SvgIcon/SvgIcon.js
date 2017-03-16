'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Transitions = require('../utilities/Transitions');

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyles = function getStyles(props, theme) {
    var color = props.color,
        hoverColor = props.hoverColor,
        hovered = props.hovered,
        padding = props.padding,
        transition = props.transition,
        size = props.size;

    var iconSize = size || theme.baseIconSize;

    return {
        root: {
            fill: hovered ? hoverColor : color,
            height: iconSize + 'px',
            margin: 0,
            padding: padding + 'px',
            transition: transition,
            width: iconSize + 'px'
        }
    };
};
var handleEvent = function handleEvent(handler) {
    return function (evt) {
        return handler(evt);
    };
};

var SvgIcon = function SvgIcon(props, context) {
    var children = props.children,
        onClick = props.onClick,
        onMouseEnter = props.onMouseEnter,
        onMouseLeave = props.onMouseLeave;

    var styles = getStyles(props, context.theme);

    return _react2.default.createElement(
        'svg',
        {
            style: styles.root,
            viewBox: '0 0 16 16',
            x: '0px',
            y: '0px',
            onClick: handleEvent(onClick),
            onMouseEnter: handleEvent(onMouseEnter),
            onMouseLeave: handleEvent(onMouseLeave)
        },
        children
    );
};
SvgIcon.contextTypes = {
    theme: _react.PropTypes.object.isRequired
};
process.env.NODE_ENV !== "production" ? SvgIcon.propTypes = {
    /**
     * SVG element's body to be rendered.
     */
    children: _react.PropTypes.node.isRequired,
    /**
     * Fill color of the SVG.
     */
    color: _react.PropTypes.string,
    /**
     * Fill color to apply when hovering over the SVG.
     */
    hoverColor: _react.PropTypes.string,
    /**
     * Indicates the SvgIcon is in a hovered state when true
     */
    hovered: _react.PropTypes.bool,
    /**
     * onClick event handler
     */
    onClick: _react.PropTypes.func,
    /**
     * onMouseEnter event handler.
     */
    onMouseEnter: _react.PropTypes.func,
    /**
     * onMouseLeave event handler.
     */
    onMouseLeave: _react.PropTypes.func,
    /**
     * Number of pixels to pad icon
     */
    padding: _react.PropTypes.number,
    /**
     * Width/Height of the SVG
     */
    size: _react.PropTypes.number,
    /**
     * Transition to apply to SVG; typically used for fill color on hover
     */
    transition: _react.PropTypes.string
} : void 0;
SvgIcon.defaultProps = {
    color: '#000',
    hoverColor: '#000',
    onClick: function onClick() {},
    onMouseEnter: function onMouseEnter() {},
    onMouseLeave: function onMouseLeave() {},
    padding: 0,
    transition: (0, _Transitions.create)('0.25s', 'fill', '0ms', 'linear')
};

exports.default = (0, _Radium2.default)(SvgIcon);