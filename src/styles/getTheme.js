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

    const {spacing, font, palette} = theme;

    theme = Object.assign({}, {
        toolbar: {
            color: palette.primary1Color,
            textColor: palette.alternateTextColor,
            height: spacing.desktopToolbarHeight,
            titleFontWeight: typography.fontWeightNormal,
            padding: spacing.desktopGutter
        },
        toolbarItem: {
            padding: spacing.desktopGutter,
            labelPadding: spacing.desktopGutterLess,
            labelFontSize: `${font.fontStyleLabelFontSize}px`
        }
    }, theme);

    const transformers = [autoprefixer, callOnce]
        .map((transform) => transform(theme))
        .filter((transformed) => transformed);

    theme.prepareStyles = (...styles) => compose(...transformers)(Object.assign({}, ...styles));

    return theme;
}

