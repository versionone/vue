import mergeStyles from './mergeStyles';

export default (getThemeValues, getDefaultStyles, getRequiredStyles) => (Component) => class ThemedComponent extends Component {
    getStyles({props, state, context: {theme}}) {
        // Theme styles to be used when generating default and required styles.
        const themeStyles = getThemeValues(Component.defaultThemeProps, theme, props, state);
        const computedThemeValues = mergeStyles(themeStyles, props.theme);

        // Default, custom, required styles
        const defaultStyles = getDefaultStyles(computedThemeValues, props, state);
        const requiredStyles = getRequiredStyles(computedThemeValues, props, state);

        return theme.prepareStyles(mergeStyles(defaultStyles, requiredStyles));
    }
}
