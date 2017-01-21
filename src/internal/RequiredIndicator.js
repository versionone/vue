import React, {Component, PropTypes, } from 'react';
import {fullyVisible as opacityFullyVisible, hidden as opacityHidden, } from './../utilities/Opacity';
import Radium from './../utilities/Radium';

class RequiredIndicator extends Component {
    static propTypes = {hidden: PropTypes.bool, };

    static contextTypes = {
        theme: PropTypes.shape({
            color: PropTypes.shape({requiredPrimary: PropTypes.string, }),
            typography: PropTypes.shape({
                lineHeightNormal: PropTypes.number,
                small: PropTypes.number,
            }),
        }),
    };

    static defaultProps = {hidden: false, };

    constructor(...args) {
        super(...args);
        this.getStyles = this.getStyles.bind(this);
    }

    getStyles() {
        const {hidden, } = this.props;
        const {
            requiredPrimaryColor,
            normalLineHeight,
            smallFontSize,
        } = this.context.theme;
        const zIndex = 1;

        return {
            root: {
                alignSelf: 'center',
                color: requiredPrimaryColor,
                fontSize: `${smallFontSize}px`,
                lineHeight: normalLineHeight,
                opacity: hidden ? opacityHidden : opacityFullyVisible,
                zIndex,
            },
        };
    }

    render() {
        const styles = this.getStyles();
        return (
            <div style={styles.root}>*</div>
        );
    }
}
export default Radium(RequiredIndicator);
