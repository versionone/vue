'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var horizontal = _react.PropTypes.oneOf(['left', 'center', 'right']);
var vertical = _react.PropTypes.oneOf(['top', 'middle', 'bottom']);

exports.default = _react.PropTypes.shape({
    horizontal: horizontal.isRequired,
    vertical: vertical.isRequired
});