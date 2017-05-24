import {V1Theme} from '@versionone/ui-themes';
import {Component, PropTypes} from 'react';

export default class ThemeProvider extends Component {
    static propTypes = {
        /**
         * Theme to be used with VersionOne UI
         */
        theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
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
        /**
         * Normal gutter size
         */
        gutter: PropTypes.number.isRequired,
        importantColor: PropTypes.string.isRequired,
        /**
         * Large font size used for ...?
         */
        largeFontSize: PropTypes.number.isRequired,
        /**
         * Large gutter
         */
        largeGutter: PropTypes.number.isRequired,
        /**
         * Larger line height used for component text.
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
         * Small gutter size; used for vertical padding on ListItems and SubHeaders.
         */
        smallGutter: PropTypes.number.isRequired,
        /**
         * Color to represent textual content that is in a disabled state.
         */
        textDisabledColor: PropTypes.string.isRequired,
        /**
         * Primary color for textual content.
         */
        textPrimaryColor: PropTypes.string.isRequired,
        /**
         * Secondary color for textual content; such as hint text.
         */
        textSecondaryColor: PropTypes.string.isRequired,
        /**
         * Largest font size used for ...?
         */
        xLargeFontSize: PropTypes.number.isRequired,
        /**
         * Extra large gutter; typically used for horizontal padding of ListItems and SubHeaders.
         */
        xLargeGutter: PropTypes.number.isRequired,
        /**
         * Slightly larger medium font size used for emphasis of medium fonts.
         */
        xMediumFontSize: PropTypes.number.isRequired,
        /**
         * Smallest font size used to de-emphasize textual content.
         */
        xSmallFontSize: PropTypes.number.isRequired,
        /**
         * Extra-small gutter spacing. Used for padding between the textual value of a TextField and its border.
         */
        xxSmallGutter: PropTypes.number.isRequired,
    };

    static defaultProps = {
        theme: V1Theme,
    };

    static
    childContextTypes = {
        theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
    };

    getChildContext() {
        return {
            theme: this.props.theme,
        };
    }

    render() {
        return this.props.children;
    }
}
