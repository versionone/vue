'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _Transparent = require('./../utilities/Transparent');

var _Transparent2 = _interopRequireDefault(_Transparent);

var _component = require('./../utilities/component');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyles = function getStyles(props, theme) {
    var highlighted = props.highlighted;
    var smallGutter = theme.smallGutter,
        largeGutter = theme.largeGutter;

    var hoveredStyles = highlighted ? {
        backgroundColor: props.highlightBackgroundColor,
        color: props.highlightColor
    } : {
        backgroundColor: _Transparent2.default,
        color: 'initial'
    };

    return {
        listItem: _extends({
            cursor: 'pointer',
            padding: smallGutter + 'px ' + largeGutter + 'px'
        }, hoveredStyles)
    };
};

var ListItem = function ListItem(props, context) {
    var children = props.children,
        oid = props.oid,
        onMouseEnter = props.onMouseEnter;

    var handleMouseEnter = (0, _component.createEventHandler)(onMouseEnter, oid);
    var styles = getStyles(props, context.theme);

    return _react2.default.createElement(
        'div',
        {
            style: styles.listItem,
            onMouseEnter: handleMouseEnter
        },
        children
    );
};
process.env.NODE_ENV !== "production" ? ListItem.propTypes = {
    /**
     * Content to render within the list item
     */
    children: _react.PropTypes.node.isRequired,
    /**
     * Color of the background when in a highlighted state
     */
    highlightBackgroundColor: _react.PropTypes.string,
    /**
     * Color of the text when in a highlighted state
     */
    highlightColor: _react.PropTypes.string,
    /**
     * When true, indicates the component is in a highlighted state
     */
    highlighted: _react.PropTypes.bool,
    /**
     * Unique oid for the item represented by the ListItem
     */
    oid: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    /**
     * Event handler; fired once mouse enters the component
     */
    onMouseEnter: _react.PropTypes.func
} : void 0;
ListItem.defaultProps = {
    highlighted: false,
    onMouseEnter: function onMouseEnter() {}
};
ListItem.contextTypes = {
    theme: _react.PropTypes.object.isRequired
};
ListItem.displayName = 'ListItem';

exports.default = (0, _Radium2.default)(ListItem);