import React, {Component, PropTypes} from 'react';
import Radium from './../utilities/Radium';
import {create} from './../styles/Transitions';
import {darken} from './../utilities/colorManipulator';
import * as ButtonSizes from './Sizes';
import * as ButtonTypes from './Types';

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
                basic: PropTypes.string,
                normalBackground: PropTypes.string,
                normalBackgroundInverse: PropTypes.string,
                textPrimary: PropTypes.string,
                textPrimaryInverse: PropTypes.string
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
            color: {
                textPrimary,
            },
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
                boxSizing: 'border-box',
                borderRadius: `${borderRadius}px`,
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
                basic,
                normalBackground,
                normalBackgroundInverse,
                textPrimary,
                textPrimaryInverse
            }
        } = this.context.theme;
        const {type} = this.props;

        if (type === ButtonTypes.basic) {
            const inverseBasicColorMultiplier = 0.35;
            return {
                ':hover': {
                    background: darken(basic, inverseBasicColorMultiplier),
                    border: `1px solid ${darken(basic, inverseBasicColorMultiplier)}`,
                    color: textPrimaryInverse
                },
                background: basic,
                border: `1px solid ${basic}`,
                color: textPrimaryInverse
            };
        }

        return {
            ':hover': {
                background: normalBackgroundInverse,
                color: textPrimaryInverse
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
