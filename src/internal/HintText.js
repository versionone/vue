import React, { Component, PropTypes, } from 'react';
import { fullyVisible as opacityFullyVisible, hidden as opacityHidden, } from './../utilities/Opacity';
import Radium from './../utilities/Radium';

class HintText extends Component {
    static propTypes = {
        hidden: PropTypes.bool,
        text: PropTypes.string,
        onClick: PropTypes.func,
    };
    static defaultProps = {
        hidden: false,
        text: '',
        onClick: () => {
        },
    };
    static contextTypes = {
        theme: PropTypes.shape({
            color: PropTypes.shape({ textSecondary: PropTypes.string, }),
            typography: PropTypes.shape({
                basicFamily: PropTypes.string,
                lineHeightNormal: PropTypes.number.isRequired,
                small: PropTypes.number.isRequired,
            }),
        }).isRequired,
    };

    constructor(...args) {
        super(...args);
        this.getStyles = this.getStyles.bind(this);
    }

    getStyles() {
        const { hidden, } = this.props;
        const {
            basicFontFamily,
            smallFontSize,
            normalLineHeight,
            textSecondaryColor,
        } = this.context.theme;

        return {
            root: {
                boxSizing: 'border-box',
                width: '100%',
            },
            text: {
                color: textSecondaryColor,
                display: 'block',
                fontFamily: basicFontFamily,
                fontSize: `${smallFontSize}px`,
                lineHeight: normalLineHeight,
                opacity: hidden ? opacityHidden : opacityFullyVisible,
                transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms',
            },
        };
    }

    render() {
        const {
            text,
            // eslint-disable-next-line no-unused-vars
            hidden,
            ...rest
        } = this.props;
        const styles = this.getStyles();

        return (
            <div
                style={styles.root}
                {...rest}
            >
                <span style={styles.text}>{text}</span>
            </div>
        );
    }
}
export default Radium(HintText);
