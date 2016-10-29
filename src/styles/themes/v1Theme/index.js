import * as colors from './foundations/colors';
import * as typography from './foundations/typography';
import * as spacing from './foundations/spacing';

export default {
    typography,
    spacing,
    field: {
        background: colors.white,
        border: `1px solid ${colors.aluminum}`,
        borderRadius: 3,
        boxShadow: 'none',
        color: colors.forge,
        font: {
            family: typography.fontFamily.basic,
            size: typography.fontSize.small
        },
        lineHeight: 1.285,
        outline: 'none',
        padding: spacing.xxSmallGutter,
        disabled: {
            border: `1px solid ${colors.minBlack}`
        },
        focused: {
            boxShadow: `0 0 7px ${colors.cerulean}`
        },
        invalid: {
            background: `${colors.lightSunset}`,
            border: `1px solid ${colors.sunset}`,
            boxShadow: `0 0 2px 2px ${colors.lightSunset}`
        },
        pending: {
            background: colors.yellowAccent
        }
    },
    errorMessage: {
        color: colors.sunset
    },
    hintText: {
        color: colors.mediumGray
    }
};