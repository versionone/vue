import { Component, PropTypes, } from 'react';
import v1Theme from './../styles/themes/v1Theme';

export default class ThemeProvider extends Component {
    static propTypes = {
        children: PropTypes.element,
        theme: PropTypes.shape(ThemeProvider.themeDefinition),
    };
    static themeDefinition = {
        /**
         * Name of theme.
         */
        _name: PropTypes.string.isRequired,
        altColor: PropTypes.string.isRequired,
        basicColor: PropTypes.string.isRequired,
        /**
         * Default font family used for components and textual content.
         */
        basicFontFamily: PropTypes.string.isRequired,
        /**
         * Font weight value to stress strong emphasis on textual content.
         */
        boldFont: PropTypes.number.isRequired,
        /**
         * Foreground color to be used to contrast a dark background.
         */
        darkInverseColor: PropTypes.string.isRequired,
        /**
         * Used to represent a disabled state.
         */
        disabledPrimaryColor: PropTypes.string.isRequired,
        /**
         * Primary color to represent an error state.
         */
        errorPrimaryColor: PropTypes.string.isRequired,
        /**
         * Secondary color to represent an error state; typically used for shadows.
         */
        errorSecondaryColor: PropTypes.string.isRequired,
        /**
         * Default color for borders of form field components.
         */
        fieldBorderColor: PropTypes.string.isRequired,
        /**
         * Primary color to represent a focused state.
         */
        focusedPrimaryColor: PropTypes.string.isRequired,
        /**
         * Secondary color to represent a focused state.
         */
        focusedSecondaryColor: PropTypes.string.isRequired,
        importantColor: PropTypes.string.isRequired,
        /**
         * Large font size used for ...?
         */
        largeFontSize: PropTypes.number.isRequired,
        /**
         * Larger line height used for actual component text as opposed to textual content. An example would be the text value of a TextField versus text for a Button.
         */
        largeLineHeight: PropTypes.number.isRequired,
        /**
         * Foreground color to be used to contrast a light background.
         */
        lightInverseColor: PropTypes.string.isRequired,
        /**
         * Medium font size used for ...?
         */
        mediumFontSize: PropTypes.number.isRequired,
        /**
         * Default background color for components.
         */
        normalBackground: PropTypes.string.isRequired,
        /**
         * Line height for textual content
         */
        normalLineHeight: PropTypes.number.isRequired,
        /**
         * Default radius
         */
        normalRadius: PropTypes.number.isRequired,
        /**
         * Primary color to represent a pending state.
         */
        pendingPrimaryColor: PropTypes.string.isRequired,
        /**
         * Default font size.
         */
        smallFontSize: PropTypes.number.isRequired,
        /**
         * Color to represent textual content that is in a disabled state.
         */
        textDisabledColor: PropTypes.string.isRequired,
        /**
         * Primary color for textual content.
         */
        textPrimaryColor: PropTypes.string.isRequired,
        /**
         * Largest font size used for ...?
         */
        xLargeFontSize: PropTypes.number.isRequired,
        /**
         * Slightly larger medium font size used for emphasis of medium fonts.
         */
        xMediumFontSize: PropTypes.number.isRequired,
        /**
         * Smallest font size used to de-emphasize textual content.
         */
        xSmallFontSize: PropTypes.number.isRequired,
        /**
         * Default gutter spacing value. It is used in places such as the padding between the textual value of a TextField and its border.
         */
        xxSmallGutter: PropTypes.number.isRequired,
    };

    static defaultProps = { theme: v1Theme, };

    static
    childContextTypes = { theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired, };

    getChildContext() {
        return { theme: this.props.theme, };
    }

    render() {
        return this.props.children;
    }
}
