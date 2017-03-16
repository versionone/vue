'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckIcon = function CheckIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('path', { stroke: 'none', d: 'M7.3,16c-0.3,0-0.5-0.1-0.7-0.3L0.3,10c-0.4-0.4-0.5-1.1-0.1-1.5C0.7,8,1.4,8,1.8,8.4L7,13.2l7-12.4\r c0.3-0.5,0.9-0.7,1.5-0.4c0.5,0.3,0.7,0.9,0.4,1.5L8.2,15.5c-0.2,0.3-0.4,0.5-0.8,0.5C7.4,16,7.3,16,7.3,16z' })
    );
};
CheckIcon.displayName = 'CheckIcon';
exports.default = CheckIcon;