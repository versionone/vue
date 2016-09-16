import mergeStyles from './mergeStyles';

export default (getThemeStyles, getDefaultStyles, getRequiredStyles) => (Component) => class ThemedComponent extends Component {
    getStyles = ({props, state, context: {theme}}) => {
        // Theme styles to be used when generating default and required styles.
        const themeStyles = getThemeStyles(Component.defaultThemeProps, theme, props, state);

        // Default, custom, required styles
        const defaultStyles = getDefaultStyles(themeStyles, props, state);
        const customStyles = props.styles;
        const requiredStyles = getRequiredStyles(themeStyles, props, state);

        return theme.prepareStyles(mergeStyles(defaultStyles, customStyles, requiredStyles));
    };
}
