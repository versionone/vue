'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ArrowRightIcon = function ArrowRightIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('polygon', { points: '16,8.2 9.6,1.8 9.6,6.8 0,6.8 0,9.5 9.6,9.5 9.6,14.5 ' })
    );
};
ArrowRightIcon.displayName = 'ArrowRightIcon';
exports.default = ArrowRightIcon;