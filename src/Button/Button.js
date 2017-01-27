import React, {PropTypes} from 'react';
import {setOpacity, darken, toRgbaString} from '@andrew-codes/color-functions';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';
import transparent from './../utilities/Transparent';
import {create} from './../styles/Transitions';
import {getForegroundForBackground} from './../utilities/colorManipulator';
import * as ButtonSizes from './Sizes';
import * as ButtonTypes from './Types';

const getStyles = (props, context) => {
    const {
        normalRadius,
        basicFontFamily,
        bold,
        largeLineHeight,
        smallFontSize,
    } = context.theme;
    const {size,} = props;

    const fontSize = smallFontSize * size;
    const height = Math.ceil(fontSize * largeLineHeight);
    const borderRadiusMultiplier = 2;
    const borderRadius = normalRadius * borderRadiusMultiplier;
    const typeStyles = getStylesBasedOnType(props, context);

    return {
        root: {
            ':focus': {outline: 'none',},
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
            ...typeStyles,
        },
    };
};
const getStylesBasedOnType = (props, context) => {
    const {
        altColor,
        basicColor,
        importantColor,
        darkInverseColor,
        lightInverseColor,
        normalBackground,
        textPrimaryColor,
    } = context.theme;
    const {disable, type,} = props;
    const inverseColors = [
        darkInverseColor,
        lightInverseColor,
    ];

    if (disable) {
        const disableColorOpacity = 0.3;
        const color = toRgbaString(setOpacity(textPrimaryColor, disableColorOpacity));
        return {
            ':hover': {
                background: normalBackground,
                color,
            },
            background: normalBackground,
            border: `1px solid ${transparent}`,
            color,
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
                color: darkInverseColor,
            },
            background: normalBackground,
            border: `1px solid ${textPrimaryColor}`,
            color: textPrimaryColor,
        };
    }

    if (type === ButtonTypes.special) {
        return {
            ':hover': {
                background: basicColor,
                border: `1px solid ${basicColor}`,
                color: darkInverseColor,
            },
            background: textPrimaryColor,
            border: `1px solid ${textPrimaryColor}`,
            color: normalBackground,
        };
    }

    const inverseBackground = getForegroundForBackground(normalBackground, inverseColors);
    const inverseForeground = getForegroundForBackground(inverseBackground, inverseColors);
    return {
        ':hover': {
            background: inverseBackground,
            color: inverseForeground,
        },
        background: normalBackground,
        border: `1px solid ${textPrimaryColor}`,
        color: textPrimaryColor,
    };
};
const handleClick = (handler, disable) => (evt) => {
    if (disable) {
        return;
    }
    handler(evt);

};
const darkenInvert = (foreground, background) => {
    const inverseBasicColorMultiplier = 0.35;
    const darkenedColor = toRgbaString(darken(background, inverseBasicColorMultiplier));
    return {
        ':hover': {
            background: darkenedColor,
            border: `1px solid ${darkenedColor}`,
            color: foreground,
        },
        background,
        border: `1px solid ${background}`,
        color: foreground,
    };
};

const defaultProps = {
    disable: false,
    size: ButtonSizes.normal,
    text: '',
    type: ButtonTypes.standard,
    onClick: () => {
    },
};
const Button = (props, context) => {
    const propsWithDefaults = {
        ...defaultProps,
        ...props,
    };
    const {
        disable,
        text,
        onClick
    } = propsWithDefaults;
    const styles = getStyles(propsWithDefaults, context);
    return (
        <button
            style={styles.root}
            onClick={handleClick(onClick, disable)}
        >
            {text}
        </button>
    );
};
Button.propTypes = {
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
        ButtonTypes.special,
    ]),
    /**
     * Click event handler; fired once a button is clicked
     */
    onClick: PropTypes.func,
};
Button.contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,};

export default Radium(Button);

