'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.emphasize = emphasize;
exports.getForegroundForBackground = getForegroundForBackground;

var _colorFunctions = require('@andrew-codes/color-functions');

var defaultEmphasizeCoefficient = 0.15; /* eslint no-magic-numbers: off */
function emphasize(color) {
    var coefficient = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEmphasizeCoefficient;

    return (0, _colorFunctions.getLuminance)(color) > 0.5 ? (0, _colorFunctions.darken)(color, coefficient) : (0, _colorFunctions.lighten)(color, coefficient);
}

function getForegroundForBackground(backgroundColor) {
    var foregroundColors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    return foregroundColors.find(function (color) {
        return (0, _colorFunctions.getContrastRatio)(color, backgroundColor) >= 11;
    }) || (0, _colorFunctions.toRgbaString)(emphasize(backgroundColor, 100));
}