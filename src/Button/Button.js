import React, {Component, PropTypes} from 'react';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';
import transparent from './../utilities/Transparent';
import {create} from '../utilities/Transitions';
import {changeOpacity, darken, getForegroundForBackground} from './../utilities/colorManipulator';
import * as ButtonSizes from './Sizes';
import * as ButtonTypes from './Types';

const darkenInvert = (foreground, background) => {
    const inverseBasicColorMultiplier = 0.35;
    const darkenedColor = darken(background, inverseBasicColorMultiplier);
    return {
        ':hover': {
            background: darkenedColor,
            border: `1px solid ${darkenedColor}`,
            color: foreground
        },
        background,
        border: `1px solid ${background}`,
        color: foreground
    };
};

class Button extends Component {
    static propTypes = {
        /**
         * Disables the button from responding to event handlers
         */
        disable: PropTypes.bool,
        /**
         * Numeric value used as a multiplier to the button's size; 0.75, 1, and 1.5 as examples
         */
        size: PropTypes.number,
        /**
         * Text string displayed within Button
         */
        text: PropTypes.string,
        /**
         * Type of button
         */
        type: PropTypes.oneOf([
            ButtonTypes.standard,
            ButtonTypes.basic,
            ButtonTypes.important,
            ButtonTypes.alt,
            ButtonTypes.basicAlt,
            ButtonTypes.special
        ]),
        /**
         * Click event handler; fired once a button is clicked
         */
        onClick: PropTypes.func
    };
    static defaultProps = {
        disable: false,
        size: ButtonSizes.normal,
        text: '',
        type: ButtonTypes.standard,
        onClick: () => {
        }
    };
    static contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired};

    constructor(...rest) {
        super(...rest);
        this.getStyles = this.getStyles.bind(this);
        this.getStylesBasedOnType = this.getStylesBasedOnType.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    getStyles() {
        const {
            normalRadius,
            basicFontFamily,
            bold,
            largeLineHeight,
            smallFontSize
        } = this.context.theme;
        const {size} = this.props;

        const fontSize = smallFontSize * size;
        const height = Math.ceil(fontSize * largeLineHeight);
        const borderRadiusMultiplier = 2;
        const borderRadius = normalRadius * borderRadiusMultiplier;
        const typeStyles = this.getStylesBasedOnType();

        return {
            root: {
                ':focus': {outline: 'none'},
                alignItems: 'flex-start',
                border: `1px solid ${transparent}`,
                borderRadius: `${borderRadius}px`,
                boxSizing: 'border-box',
                cursor: 'pointer',
                display: 'inline-block',
                fontFamily: basicFontFamily,
                fontSize: `${fontSize}px`,
                fontWeight: bold,
                height: `${height}px`,
                letterSpacing: '0.03em',
                lineHeight: `${largeLineHeight}px`,
                margin: '0',
                padding: '0 1em',
                textAlign: 'center',
                textShadow: 'none',
                transition: create('0.5s'),
                whiteSpace: 'no-wrap',
                ...typeStyles
            }
        };
    }

    getStylesBasedOnType() {
        const {
            altColor,
            basicColor,
            importantColor,
            darkInverseColor,
            lightInverseColor,
            normalBackground,
            textPrimaryColor
        } = this.context.theme;
        const {disable, type} = this.props;
        const inverseColors = [darkInverseColor, lightInverseColor];

        if (disable) {
            const disableColorOpacity = 0.3;
            const color = changeOpacity(textPrimaryColor, disableColorOpacity);
            return {
                ':hover': {
                    background: normalBackground,
                    color
                },
                background: normalBackground,
                border: `1px solid ${transparent}`,
                color
            };
        }
        if (type === ButtonTypes.basic) {
            return darkenInvert(darkInverseColor, basicColor);
        }
        if (type === ButtonTypes.important) {
            return darkenInvert(darkInverseColor, importantColor);
        }
        if (type === ButtonTypes.alt) {
            return darkenInvert(darkInverseColor, altColor);
        }
        if (type === ButtonTypes.basicAlt) {
            return {
                ':hover': {
                    background: basicColor,
                    border: `1px solid ${basicColor}`,
                    color: darkInverseColor
                },
                background: normalBackground,
                border: `1px solid ${textPrimaryColor}`,
                color: textPrimaryColor
            };
        }

        if (type === ButtonTypes.special) {
            return {
                ':hover': {
                    background: basicColor,
                    border: `1px solid ${basicColor}`,
                    color: darkInverseColor
                },
                background: textPrimaryColor,
                border: `1px solid ${textPrimaryColor}`,
                color: normalBackground
            };
        }

        const inverseBackground = getForegroundForBackground(normalBackground, inverseColors);
        const inverseForeground = getForegroundForBackground(inverseBackground, inverseColors);
        return {
            ':hover': {
                background: inverseBackground,
                color: inverseForeground
            },
            background: normalBackground,
            border: `1px solid ${textPrimaryColor}`,
            color: textPrimaryColor
        };
    }

    handleClick(evt) {
        const {
            disable,
            onClick
        } = this.props;
        if (disable) {
            return;
        }
        onClick(evt);
    }

    render() {
        const {text} = this.props;
        const styles = this.getStyles();
        return (
            <button
                style={styles.root}
                onClick={this.handleClick}
            >
                {text}</button>
        );
    }
}
export default Radium(Button);
