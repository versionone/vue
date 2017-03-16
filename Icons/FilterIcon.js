'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FilterIcon = function FilterIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement('polygon', { points: '6.2,16 9.8,13.3 9.8,9.1 16,0 8,0 0,0 6.2,9.1 ' })
    );
};
FilterIcon.displayName = 'FilterIcon';
exports.default = FilterIcon;