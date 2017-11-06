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
        _react2.default.createElement('path', { stroke: 'none', id: 'XMLID_4_', d: 'M15.4,0.9l-0.3-0.3C14.8,0.3,14,0.1,14,0.1V0H2.1c0,0,0,0,0,0H2v0c0,0-0.9,0.2-1.2,0.5L0.5,0.8\r c-0.7,0.7-0.7,1.8,0,2.5l5.4,5.4c0,0,0.1,0.1,0.1,0.1v5.4C6,15.2,6.8,16,7.8,16h0.6c0.9,0,1.6-0.8,1.6-1.7V8.7l5.4-5.3\r C16.1,2.7,16.1,1.6,15.4,0.9z' })
    );
};
FilterIcon.displayName = 'FilterIcon';
exports.default = FilterIcon;