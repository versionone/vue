import React, {Component, PropTypes, } from 'react';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';
import * as Transitions from './../styles/Transitions';
import {fullyVisible as opacityFullyVisible, hidden as opacityHidden, } from './../utilities/Opacity';

class ErrorMessage extends Component {
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
    static contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired, };

    constructor(...args) {
        super(...args);
        this.getStyles = this.getStyles.bind(this);
    }

    getStyles() {
        const {hidden, } = this.props;
        const {
            errorPrimaryColor,
            basicFontFamily,
            smallFontSize,
            normalLineHeight,
        } = this.context.theme;

        return {
            text: {
                color: errorPrimaryColor,
                display: 'block',
                fontFamily: basicFontFamily,
                fontSize: `${smallFontSize}px`,
                lineHeight: normalLineHeight,
                opacity: hidden ? opacityHidden : opacityFullyVisible,
                transition: Transitions.create('450ms', 'opacity', '0ms', 'cubic-bezier(0.23, 1, 0.32, 1)'),
            },
        };
    }

    render() {
        // eslint-disable-next-line no-unused-vars
        const {text, hidden, ...rest} = this.props;
        const styles = this.getStyles();

        return (
            <div {...rest}><span style={styles.text}>{text}</span></div>
        );
    }
}
export default Radium(ErrorMessage);
