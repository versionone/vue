import * as colors from './foundations/colors';

export default {
    typography: {
        // Font families
        basicFamily: `'Proxima Nova', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif`,

        // Sizes
        xSmall: 8,
        small: 14,
        medium: 16,
        xMedium: 18,
        large: 22,
        xLarge: 24,

        // Other
        lineHeightNormal: 1.285
    },
    spacing: {
        xxSmallGutter: 3
    },
    color: {
        transparent: colors.transparent,

        // Text content colors
        textPrimary: colors.forge,
        textSecondary: colors.mediumGray,

        // Focused
        focusedPrimary: colors.cerulean,

        // Disabled
        disabledPrimary: colors.minBlack,

        // Error
        errorPrimary: colors.sunset,
        errorSecondary: colors.lightSunset,

        // Pending
        pendingPrimary: colors.yellowAccent,

        // Backgrounds
        normalBackground: colors.white,

        // Borders
        fieldBorder: colors.aluminum
    },
    // Borders, radius, box shadows, etc.
    border: {
        normalRadius: 3
    }
};