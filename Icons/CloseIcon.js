'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CloseIcon = function CloseIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('polygon', { points: '24,5 19,0 12,7.2 4.9,0 0,5 7.2,12 0,19 4.9,24 12,16.8 19,24 24,19 16.8,12 ' })
    );
};
CloseIcon.displayName = 'CloseIcon';
exports.default = CloseIcon;