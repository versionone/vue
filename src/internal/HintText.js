import React, {PropTypes} from 'react';
import {fullyVisible as opacityFullyVisible, hidden as opacityHidden} from './../utilities/Opacity';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';

const getStyles = (props, context) => {
    const {
        hidden,
    } = props;
    const {
        basicFontFamily,
        smallFontSize,
        normalLineHeight,
        textSecondaryColor,
    } = context.theme;

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
};
const defaultProps = {
    hidden: false,
    text: '',
    onClick: () => {
    },
};
const HintText = (props, context) => {
    const propsWithDefaults = {
        ...defaultProps,
        ...props,
    };
    const {
        text,
        // eslint-disable-next-line no-unused-vars
        hidden,
        ...rest
    } = propsWithDefaults;
    const styles = getStyles(propsWithDefaults, context);

    return (
        <div
            style={styles.root}
            {...rest}
        >
            <span style={styles.text}>{text}</span>
        </div>
    );
};
HintText.propTypes = {
    hidden: PropTypes.bool,
    onClick: PropTypes.func,
    text: PropTypes.string,
};
HintText.contextTypes = {
    theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
};
HintText.displayName = 'HintText';

export default Radium(HintText);
