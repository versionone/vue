import {changeOpacity} from './../../../utilities/colorManipulator';
import * as colors from './foundations/colors';

export default {
    _name: 'VersionOne Default Theme',
    altColor: colors.sunglow,
    basicColor: colors.cerulean,
    basicFontFamily: '\'Proxima Nova\', \'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif',
    boldFont: 600,
    darkInverseColor: colors.white,
    disabledPrimaryColor: colors.minBlack,
    errorPrimaryColor: colors.sunset,
    errorSecondaryColor: colors.lightSunset,
    fieldBorderColor: colors.aluminum,
    focusedPrimaryColor: colors.cerulean,
    focusedSecondaryColor: changeOpacity(colors.cerulean, 0.5),
    importantColor: colors.mango,
    largeFontSize: 22,
    largeLineHeight: 2.285,
    lightInverseColor: colors.gunMetal,
    mediumFontSize: 16,
    normalBackground: colors.white,
    normalLineHeight: 1.285,
    normalRadius: 3,
    requiredPrimaryColor: colors.sunset,
    pendingPrimaryColor: colors.yellowAccent,
    smallFontSize: 14,
    textPrimaryColor: colors.gunMetal,
    textDisabledColor: colors.minBlack,
    xLargeFontSize: 24,
    xMediumFontSize: 18,
    xSmallFontSize: 8,
    xxSmallGutter: 3
};
