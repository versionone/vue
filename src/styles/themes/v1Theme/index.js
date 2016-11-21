import {changeOpacity} from 'vue/utilities/colorManipulator';
import * as colors from './foundations/colors';

export default {
    typography: {
        // Font families
        basicFamily: '\'Proxima Nova\', \'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif',

        // Sizes
        xSmall: 8,
        small: 14,
        medium: 16,
        xMedium: 18,
        large: 22,
        xLarge: 24,

        // Treatments
        bold: 600,

        // Other
        lineHeightNormal: 1.285,
        lineHeightLarge: 2.285
    },
    spacing: {xxSmallGutter: 3},
    color: {
        transparent: colors.transparent,
        darkInverse: colors.white,
        lightInverse: colors.gunMetal,

        // Text content colors
        textPrimary: colors.gunMetal,
        textSecondary: colors.mediumGray,

        // Focused
        focusedPrimary: colors.cerulean,
        focusedSecondary: changeOpacity(colors.cerulean, 0.5),

        // Disabled
        disabledPrimary: colors.minBlack,

        // Error
        errorPrimary: colors.sunset,
        errorSecondary: colors.lightSunset,
        requiredPrimary: colors.sunset,

        // Pending
        pendingPrimary: colors.yellowAccent,

        // Backgrounds
        normalBackground: colors.white,

        // Borders
        fieldBorder: colors.aluminum,

        basic: colors.cerulean,
        important: colors.mango,
        alt: colors.sunglow
    },
    // Borders, radius, box shadows, etc.
    border: {normalRadius: 3}
};
