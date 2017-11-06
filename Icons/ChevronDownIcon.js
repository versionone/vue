'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChevronDownIcon = function ChevronDownIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement(
            'g',
            { transform: 'matrix(1,0,0,1.0297627,0,-18.962544)' },
            _react2.default.createElement('path', { d: 'M3.4,24c0.3-0.3,0.8-0.3,1.1,0l2.9,2.7C7.6,26.9,7.8,27,8,27c0.2,0,0.4-0.2,0.6-0.3l2.9-2.7c0.2-0.2,0.8-0.3,1.1,0\r c0.3,0.3,0.3,0.8,0,1.1l-3,2.8c-0.4,0.5-1,0.7-1.8,0.7s-1.1-0.3-1.6-0.7l-2.9-2.8C3,24.8,3.1,24.3,3.4,24L3.4,24z' })
        )
    );
};
ChevronDownIcon.displayName = 'ChevronDownIcon';
exports.default = ChevronDownIcon;