import mergeStyles from './mergeStyles';

export default (getThemeValues, getDefaultStyles, getRequiredStyles) => ({props, state, context: {theme}}) => {
    // Theme styles to be used when generating default and required styles.
    const themeStyles = getThemeValues(theme, props, state);
    const computedThemeValues = mergeStyles(themeStyles, props.theme);

    // Default, custom, required styles
    const defaultStyles = getDefaultStyles(computedThemeValues, props, state);
    const requiredStyles = getRequiredStyles(computedThemeValues, props, state);

    return mergeStyles(defaultStyles, requiredStyles);
};