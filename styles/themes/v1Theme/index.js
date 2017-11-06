'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _colorFunctions = require('@andrew-codes/color-functions');

var _colors = require('./foundations/colors');

var colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
    _name: 'VersionOne Default Theme',
    altColor: colors.sunglow,
    basicColor: colors.cerulean,
    basicFontFamily: '\'Proxima Nova\', \'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif',
    baseIconSize: 16,
    boldFont: 600,
    borderPrimaryColor: colors.black,
    darkInverseColor: colors.white,
    disabledPrimaryColor: colors.minBlack,
    errorPrimaryColor: colors.sunset,
    errorSecondaryColor: colors.lightSunset,
    fieldBorderColor: colors.aluminum,
    focusedPrimaryColor: colors.cerulean,
    focusedSecondaryColor: (0, _colorFunctions.toRgbaString)((0, _colorFunctions.setOpacity)(colors.cerulean, 0.5)),
    gutter: 8,
    importantColor: colors.mango,
    largeFontSize: 22,
    largeGutter: 12,
    largeLineHeight: 2.285,
    lightInverseColor: colors.gunMetal,
    mediumFontSize: 16,
    normalBackground: colors.white,
    normalLineHeight: 1.285,
    normalRadius: 6,
    requiredPrimaryColor: colors.sunset,
    pendingPrimaryColor: colors.yellowAccent,
    smallFontSize: 14,
    smallGutter: 6,
    textPrimaryColor: colors.gunMetal,
    textSecondaryColor: colors.aluminum,
    textDisabledColor: colors.minBlack,
    xLargeFontSize: 24,
    xLargeGutter: 16,
    xMediumFontSize: 18,
    xSmallFontSize: 8,
    xxSmallGutter: 3
};