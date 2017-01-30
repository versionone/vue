import React, {PropTypes} from 'react';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';
import * as Transitions from './../styles/Transitions';
import {fullyVisible as opacityFullyVisible, hidden as opacityHidden} from './../utilities/Opacity';

const getStyles = (props, context) => {
    const {
        hidden,
    } = props;
    const {
        errorPrimaryColor,
        basicFontFamily,
        smallFontSize,
        normalLineHeight,
    } = context.theme;

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
};

const ErrorMessage = (props, context) => {
    const {
        text,
        // eslint-disable-next-line no-unused-vars
        hidden,
        ...rest
    } = props;
    const styles = getStyles(props, context);

    return (
        <div{...rest}>
            <span style={styles.text}>
                {text}
            </span>
        </div>
    );
};
ErrorMessage.propTypes = {
    hidden: PropTypes.bool,
    onClick: PropTypes.func,
    text: PropTypes.string,
};
ErrorMessage.defaultProps = {
    hidden: false,
    onClick: () => {
    },
    text: '',
};
ErrorMessage.contextTypes = {
    theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
};

export default Radium(ErrorMessage);
