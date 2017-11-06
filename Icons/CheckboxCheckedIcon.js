'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxCheckedIcon = function CheckboxCheckedIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('path', { d: 'M7.6,12.1c-0.1,0-0.2-0.1-0.3-0.2L4.2,9.1C4,8.9,3.9,8.5,4.1,8.3C4.3,8,4.7,8,4.9,8.2l2.6,2.4L11,4.4\r c0.1-0.2,0.4-0.4,0.7-0.2C12,4.4,12.1,4.7,11.9,5l-3.8,6.9C8,12,7.9,12.1,7.6,12.1C7.7,12.1,7.6,12.1,7.6,12.1z' }),
        _react2.default.createElement('path', { d: 'M11.5,13.5h-7c-1.1,0-2-0.9-2-2v-7c0-1.1,0.9-2,2-2h7c1.1,0,2,0.9,2,2v7C13.5,12.6,12.6,13.5,11.5,13.5z' })
    );
};
CheckboxCheckedIcon.displayName = 'CheckboxCheckedIcon';
exports.default = CheckboxCheckedIcon;