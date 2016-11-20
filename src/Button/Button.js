import React, {Component, PropTypes} from 'react';
import Radium from './../utilities/Radium';
import {create} from './../styles/Transitions';
import {darken, getForegroundForBackground} from './../utilities/colorManipulator';
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
        size: PropTypes.number,
        text: PropTypes.string,
        type: PropTypes.oneOf(ButtonTypes),
        onClick: PropTypes.func
    };
    static defaultProps = {
        size: ButtonSizes.normal,
        text: '',
        type: ButtonTypes.standard,
        onClick: () => {
        }
    };
    static contextTypes = {
        theme: PropTypes.shape({
            borders: PropTypes.shape({normalRadius: PropTypes.number.isRequired}),
            color: PropTypes.shape({
                alt: PropTypes.string,
                basic: PropTypes.string,
                darkInverse: PropTypes.string,
                important: PropTypes.string,
                lightInverse: PropTypes.string,
                normalBackground: PropTypes.string,
                textPrimary: PropTypes.string,
                transparent: PropTypes.string
            }),
            typography: PropTypes.shape({
                basicFontFamily: PropTypes.string,
                bold: PropTypes.number,
                lineHeightLarge: PropTypes.number.isRequired,
                small: PropTypes.number.isRequired
            }).isRequired
        }).isRequired
    };

    constructor(...rest) {
        super(...rest);
        this.getStyles = this.getStyles.bind(this);
        this.getStylesBasedOnType = this.getStylesBasedOnType.bind(this);
    }

    getStyles() {
        const {
            border: {normalRadius},
            color: {transparent},
            typography: {
                basicFontFamily,
                bold,
                lineHeightLarge,
                small
            }
        } = this.context.theme;
        const {size} = this.props;

        const fontSize = small * size;
        const height = Math.ceil(fontSize * lineHeightLarge);
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
                lineHeight: `${lineHeightLarge}px`,
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
            color: {
                alt,
                basic,
                important,
                darkInverse,
                lightInverse,
                normalBackground,
                textPrimary
            }
        } = this.context.theme;
        const {type} = this.props;
        const inverseColors = [darkInverse, lightInverse];

        if (type === ButtonTypes.basic) {
            return darkenInvert(darkInverse, basic);
        }
        if (type === ButtonTypes.important) {
            return darkenInvert(darkInverse, important);
        }
        if (type === ButtonTypes.alt) {
            return darkenInvert(darkInverse, alt);
        }
        if (type === ButtonTypes.basicAlt) {
            return {
                ':hover': {
                    background: basic,
                    border: `1px solid ${basic}`,
                    color: darkInverse
                },
                background: normalBackground,
                border: `1px solid ${textPrimary}`,
                color: textPrimary
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
            border: `1px solid ${textPrimary}`,
            color: textPrimary
        };
    }

    render() {
        const {
            onClick,
            text
        } = this.props;
        const styles = this.getStyles();
        return (
            <button
                style={styles.root}
                onClick={onClick}
            >
                {text}</button>
        );
    }
}
export default Radium(Button);
