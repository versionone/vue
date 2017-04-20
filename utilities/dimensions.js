'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getValue = exports.getUnit = undefined;

var _cssStripUnits = require('css-strip-units');

var _cssStripUnits2 = _interopRequireDefault(_cssStripUnits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUnit = exports.getUnit = function getUnit(value) {
    if (!value) {
        throw new Error('Value is null or undefined');
    }
    return (0, _cssStripUnits2.default)(value);
};

var getValue = exports.getValue = function getValue(value) {
    if (!value) {
        throw new Error('Value is null or undefined');
    }
    return parseFloat(value.replace((0, _cssStripUnits2.default)(value), ''));
};