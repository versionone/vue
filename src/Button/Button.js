import React, {Component, PropTypes} from 'react';
import Radium from './../utilities/Radium';
import {create} from './../styles/Transitions';
import * as ButtonSizes from './Sizes';

class Button extends Component {
    static propTypes = {
        size: PropTypes.number,
        text: PropTypes.string,
        onClick: PropTypes.func
    };
    static defaultProps = {
        size: ButtonSizes.normal,
        text: '',
        onClick: () => {
        }
    };
    static contextTypes = {
        theme: PropTypes.shape({
            borders: PropTypes.shape({normalRadius: PropTypes.number.isRequired}),
            color: PropTypes.shape({
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
    }

    getStyles() {
        const {
            border: {normalRadius},
            color: {
                normalBackground,
                normalBackgroundInverse,
                textPrimary,
                textPrimaryInverse
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

        return {
            root: {
                ':focus': {outline: 'none'},
                ':hover': {
                    background: normalBackgroundInverse,
                    color: textPrimaryInverse
                },
                alignItems: 'flex-start',
                background: normalBackground,
                boxSizing: 'border-box',
                border: `1px solid ${textPrimary}`,
                borderRadius: `${borderRadius}px`,
                color: textPrimary,
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
                whiteSpace: 'no-wrap'
            }
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
