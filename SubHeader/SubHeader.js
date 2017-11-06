'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Radium = require('./../utilities/Radium');

var _Radium2 = _interopRequireDefault(_Radium);

var _Transparent = require('./../utilities/Transparent');

var _Transparent2 = _interopRequireDefault(_Transparent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getStyles = function getStyles(props, context) {
    return {
        root: {
            backgroundColor: _Transparent2.default,
            borderBottom: '1px dashed #a6a6a6',
            color: '#a6a6a6',
            padding: context.theme.smallGutter + 'px ' + context.theme.largeGutter + 'px',
            textTransform: 'uppercase'
        }
    };
};

var SubHeader = function SubHeader(props, context) {
    var children = props.children;

    var styles = getStyles(props, context);

    return _react2.default.createElement(
        'header',
        { style: styles.root },
        children
    );
};
SubHeader.displayName = 'SubHeader';
process.env.NODE_ENV !== "production" ? SubHeader.propTypes = {
    children: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.node])
} : void 0;
SubHeader.contextTypes = {
    theme: _react.PropTypes.object.isRequired
};

exports.default = (0, _Radium2.default)(SubHeader);