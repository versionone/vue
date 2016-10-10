import mergeStyles from './mergeStyles';

export default (getThemeValues, getStylesFromTheme) => ({props, state, context: {theme}}) => {
    // Theme styles to be used when generating default and required styles.
    const themeValues = getThemeValues(theme, props, state);
    const computedThemeValues = mergeStyles(themeValues, props.defaultTheme);

    // Default, custom, required styles
    return getStylesFromTheme(computedThemeValues, props, state);
};