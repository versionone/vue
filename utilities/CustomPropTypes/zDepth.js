'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var computeZDepths = function computeZDepths() {
    var lowestZDepth = 0;
    var highestZDepth = 5;
    var depthIncrement = 1;
    var zDepths = [];

    for (var depth = lowestZDepth; depth <= highestZDepth; depth += depthIncrement) {
        zDepths.push(depth);
    }
    return zDepths;
};

exports.default = _react.PropTypes.oneOf(computeZDepths());