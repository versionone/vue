'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxUi = require('redux-ui');

var _reduxUi2 = _interopRequireDefault(_reduxUi);

var _Sizes = require('./../Button/Sizes');

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _Transparent = require('./../utilities/Transparent');

var _Transparent2 = _interopRequireDefault(_Transparent);

var _Transitions = require('../utilities/Transitions');

var _component = require('./../utilities/component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyles = function getStyles(props, theme) {
    var border = '1px solid ' + _Transparent2.default;
    var hasBorderProp = Boolean(props.border);
    if (props.disable && hasBorderProp) {
        border = '1px solid ' + theme.disabledPrimaryColor;
    } else if (hasBorderProp) {
        border = props.border;
    }
    return {
        root: {
            backgroundColor: Boolean(props.disable) || !props.hovered && !props.ui.hovered ? props.backgroundColor : props.hoverBackgroundColor,
            border: border,
            borderRadius: props.circle ? '50%' : '0px',
            cursor: props.disable ? 'not-allowed' : 'pointer',
            display: 'inline-block',
            lineHeight: 0.6,
            transition: props.transition
        }
    };
};

var IconButton = function IconButton(props, context) {
    var color = props.color,
        disable = props.disable,
        hoverColor = props.hoverColor,
        hovered = props.hovered,
        ui = props.ui,
        onClick = props.onClick,
        size = props.size,
        updateUI = props.updateUI;
    var _context$theme = context.theme,
        baseIconSize = _context$theme.baseIconSize,
        disabledPrimaryColor = _context$theme.disabledPrimaryColor,
        smallGutter = _context$theme.smallGutter;


    var iconSize = baseIconSize * size;
    var iconColor = disable ? disabledPrimaryColor : color;
    var iconHoverColor = disable ? disabledPrimaryColor : hoverColor;
    var handleClick = (0, _component.createConditionalEventHandler)(!disable)(onClick);
    var handleMouseEnter = (0, _component.createEventHandlerIgnoringEventData)(updateUI, 'hovered', true);
    var handleMouseLeave = (0, _component.createEventHandlerIgnoringEventData)(updateUI, 'hovered', false);
    var styles = getStyles(props, context.theme);

    return _react2.default.createElement(
        'div',
        {
            style: styles.root,
            onClick: handleClick,
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave
        },
        _react2.default.createElement(props.icon, {
            color: iconColor,
            hoverColor: iconHoverColor,
            hovered: hovered || ui.hovered,
            padding: smallGutter,
            size: iconSize
        })
    );
};
process.env.NODE_ENV !== "production" ? IconButton.propTypes = {
    /**
     * Background color of button
     */
    backgroundColor: _react.PropTypes.string,
    /**
     * Border of icon button
     */
    border: _react.PropTypes.string,
    /**
     * Will render a circular button when true
     */
    circle: _react.PropTypes.bool,
    /**
     * Color of the SvgIcon within button
     */
    color: _react.PropTypes.string,
    /**
     * Disables the button from responding to event handlers
     */
    disable: _react.PropTypes.bool,
    /**
     * Background color when hovered
     */
    hoverBackgroundColor: _react.PropTypes.string,
    /**
     * Hover color of SvgIcon
     */
    hoverColor: _react.PropTypes.string,
    /**
     * Indicates the IconButton is in a hovered state when true
     */
    hovered: _react.PropTypes.bool,
    /**
     * Icon to render within button
     */
    icon: _react.PropTypes.func.isRequired,
    /**
     * Click event handler; fired once a button is clicked
     */
    onClick: _react.PropTypes.func,
    /**
     * Numeric value used as a multiplier to the button's size; 0.75, 1, and 1.5 as examples
     */
    size: _react.PropTypes.number,
    transition: _react.PropTypes.string,
    /**
     * Managed UI state props; can be overridden
     */
    ui: _react.PropTypes.object,
    /**
     * Callback fired when a ui prop related action is dispatched
     */
    updateUI: _react.PropTypes.func
} : void 0;
IconButton.defaultProps = {
    backgroundColor: _Transparent2.default,
    circle: false,
    disable: false,
    onClick: function onClick() {},
    size: _Sizes.normal,
    transition: (0, _Transitions.create)('0.25s', 'all', '0ms', 'linear'),
    updateUI: function updateUI() {}
};
IconButton.contextTypes = {
    theme: _react.PropTypes.object.isRequired
};
IconButton.displayName = 'IconButton';
exports.default = (0, _Radium2.default)((0, _reduxUi2.default)({
    state: {
        hovered: false
    }
})(IconButton));