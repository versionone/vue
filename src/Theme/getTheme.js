import * as zIndex from './zIndex';
import v1Theme from './../styles/themes/v1Theme';
import autoprefixer from './../utilities/autoprefixer';
import callOnce from '../utilities/callOnce';
import compose from 'recompose/compose';

const expandTheme = (theme) => {
    const {spacing, typography, palette} = theme;
    return {
        Toolbar: {
            color: palette.primary3Color,
            textColor: palette.textColor,
            height: spacing.desktopToolbarHeight,
            titleFontWeight: typography.fontWeightNormal,
            padding: spacing.desktopGutter,
            fontFamily: typography.fontFamily
        },
        ToolbarItem: {
            padding: spacing.desktopGutter,
            labelPadding: spacing.desktopGutterLess,
            labelFontSize: `${typography.fontStyleLabelFontSize}px`
        },
        ToolbarSeparator: {
            padding: spacing.desktopGutter,
            color: palette.borderColor
        },
        ToolbarTitle: {
            fontSize: typography.fontStyleTitleFontSize,
            padding: spacing.desktopGutter
        }
    };
};


export default function getTheme(theme, ...more) {
    theme = Object.assign({}, {
        zIndex,
        isRtl: false,
        userAgent: undefined
    }, v1Theme, theme, ...more);
    theme = Object.assign({}, expandTheme(theme), theme);
    const transformers = [autoprefixer, callOnce]
        .map((transform) => transform(theme))
        .filter((transformed) => transformed);
    theme.prepareStyles = (...styles) => compose(...transformers)(Object.assign({}, ...styles));
    return theme;
}

