import React, {PropTypes,} from 'react';
import {fullyVisible as opacityFullyVisible, hidden as opacityHidden,} from './../utilities/Opacity';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';

const getStyles = (props, context) => {
    const {hidden,} = props;
    const {
        requiredPrimaryColor,
        normalLineHeight,
        smallFontSize,
    } = context.theme;
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
};

const defaultProps = {
    hidden: false,
};
const RequiredIndicator = (props, context) => {
    const propsWithDefaults = {
        ...defaultProps,
        ...props,
    };
    const styles = getStyles(propsWithDefaults, context);

    return (
        <div style={styles.root}>*</div>
    );
};
RequiredIndicator.propTypes = {hidden: PropTypes.bool,};
RequiredIndicator.contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,};

export default Radium(RequiredIndicator);
