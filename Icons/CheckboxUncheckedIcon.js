'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CheckboxUncheckedIcon = function CheckboxUncheckedIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('path', { d: 'M11.5,13.5h-7c-1.1,0-2-0.9-2-2v-7c0-1.1,0.9-2,2-2h7c1.1,0,2,0.9,2,2v7C13.5,12.6,12.6,13.5,11.5,13.5z' })
    );
};
CheckboxUncheckedIcon.displayName = 'CheckboxUncheckedIcon';
exports.default = CheckboxUncheckedIcon;