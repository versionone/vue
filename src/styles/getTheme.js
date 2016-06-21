import * as zIndex from './zIndex';
import * as typography from './typography';
import v1Theme from './themes/v1Theme';
import autoprefixer from './../utilities/autoprefixer';
import callOnce from '../utilities/callOnce';
import compose from 'recompose/compose';

export default function getTheme(theme, ...more) {
    theme = Object.assign({}, {
        zIndex,
        isRtl: false,
        userAgent: undefined
    }, v1Theme, theme, ...more);

    const {spacing, fontFamily, palette} = theme;

    theme = Object.assign({}, {
        Toolbar: {
            color: palette.primary1Color,
            textColor: palette.alternateTextColor,
            height: spacing.desktopKeylineIncrement,
            titleFontWeight: typography.fontWeightNormal,
            padding: spacing.desktopGutter
        }
    }, theme);

    const transformers = [autoprefixer, callOnce]
        .map((transform) => transform(theme))
        .filter((transformed) => transformed);

    theme.prepareStyles = compose(...transformers);

    return theme;
}

