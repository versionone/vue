'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _SvgIcon = require('./../SvgIcon');

var _SvgIcon2 = _interopRequireDefault(_SvgIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChevronRightIcon = function ChevronRightIcon(props) {
    return _react2.default.createElement(
        _SvgIcon2.default,
        props,
        _react2.default.createElement(
            'g',
            { transform: 'matrix(1,0,0,1.0297627,0,-18.962544)' },
            _react2.default.createElement('path', { d: 'M5.7,30.6c-0.3-0.3-0.3-0.8,0-1.1l2.8-2.8c0.2-0.2,0.3-0.4,0.3-0.6c0-0.2-0.2-0.4-0.3-0.6l-2.8-2.8c-0.2-0.2-0.3-0.8,0-1.1\r c0.3-0.3,0.8-0.3,1.1,0l2.9,2.9c0.5,0.4,0.7,1,0.7,1.7c0,0.8-0.3,1.1-0.7,1.6l-2.9,2.8C6.5,31,6,30.9,5.7,30.6L5.7,30.6z' })
        )
    );
};
ChevronRightIcon.displayName = 'ChevronRightIcon';
exports.default = ChevronRightIcon;