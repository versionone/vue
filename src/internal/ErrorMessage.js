import React, {Component, PropTypes} from 'react';
import gettingStyles from '../Theme/gettingStyles';
import mergeStyles from './../Theme/mergeStyles';

const getThemeValues = (theme) => mergeStyles(ErrorMessage.defaultThemeProps, theme.ErrorMessage.default);
const getStylesFromTheme = (themeValues, props) => ({
    text: {
        color: themeValues.textColor,
        display: 'block',
        fontSize: `${themeValues.fontSize}px`,
        fontFamily: themeValues.fontFamily,
        lineHeight: themeValues.lineHeight,
        opacity: props.hidden ? 0 : 1,
        transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    }
});

const getStyles = gettingStyles(getThemeValues, getStylesFromTheme);

class ErrorMessage extends Component {
    static propTypes = {
        defaultTheme: PropTypes.shape(ErrorMessage.themePropTypes),
        hidden: PropTypes.bool,
        onClick: PropTypes.func,
        text: PropTypes.string
    };
    static defaultProps = {
        defaultTheme: {},
        hidden: false,
        onClick: () => {
        },
        text: ''
    };
    static themePropTypes = {
        fontFamily: PropTypes.string,
        fontSize: PropTypes.number,
        textColor: PropTypes.string
    };
    static defaultThemeProps = {
        fontFamily: 'Arial',
        fontSize: '16px',
        textColor: 'red'
    };
    static contextTypes = {
        theme: PropTypes.object
    };

    render() {
        // eslint-disable-next-line no-unused-vars
        const {text, hidden, defaultTheme, ...rest} = this.props;
        const styles = getStyles(this);

        return (
            <div {...rest}><span style={styles.text}>{text}</span></div>
        );
    }
}
export default ErrorMessage;
