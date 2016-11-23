import {changeOpacity} from 'vue/utilities/colorManipulator';
import * as colors from './foundations/colors';

export const name = 'V1 Default Theme';
export const values = {
    altColor: colors.sunglow,
    basicColor: colors.cerulean,
    basicFont: '\'Proxima Nova\', \'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif',
    boldFont: 600,
    darkInverseColor: colors.white,
    disabledPrimaryColor: colors.minBlack,
    errorPrimaryColor: colors.sunset,
    errorSecondaryColor: colors.lightSunset,
    fieldBorderColor: colors.aluminum,
    focusedPrimaryColor: colors.cerulean,
    focusedSecondaryColor: changeOpacity(colors.cerulean, 0.5),
    importantColor: colors.mango,
    largeFont: 22,
    largeLineHeight: 2.285,
    lightInverseColor: colors.gunMetal,
    mediumFont: 16,
    normalBackground: colors.white,
    normalLineHeight: 1.285,
    normalRadius: 3,
    requiredPrimaryColor: colors.sunset,
    pendingPrimaryColor: colors.yellowAccent,
    smallFont: 14,
    textPrimaryColor: colors.gunMetal,
    xLargeFont: 24,
    xMediumFont: 18,
    xSmallFont: 8,
    xxSmallGutter: 3
};
