'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AddIcon = function AddIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('path', {
            d: 'M8,0.5C3.9,0.5,0.5,3.9,0.5,8s3.4,7.5,7.5,7.5s7.5-3.4,7.5-7.5S12.1,0.5,8,0.5z M13,9H8.9v3.9h-2V9H3V7h3.9V2.9h2V7H13V9z'
        })
    );
};
AddIcon.displayName = 'AddIcon';
exports.default = AddIcon;