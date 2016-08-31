import * as zIndex from './zIndex';
import v1Theme from 'versionone-ui/styles/themes/v1Theme';
import autoprefixer from './../utilities/autoprefixer';
import callOnce from '../utilities/callOnce';
import compose from 'recompose/compose';

export default function getTheme(theme, ...more) {
    theme = Object.assign({}, {
        zIndex,
        isRtl: false,
        userAgent: undefined
    }, v1Theme, theme, ...more);
    const transformers = [autoprefixer, callOnce]
        .map((transform) => transform(theme))
        .filter((transformed) => transformed);
    theme.prepareStyles = (...styles) => compose(...transformers)(Object.assign({}, ...styles));
    return theme;
}

