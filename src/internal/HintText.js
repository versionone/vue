import React, {Component, PropTypes} from 'react';
import gettingStyles from '../Theme/gettingStyles';
import mergeStyles from './../Theme/mergeStyles';

const getThemeValues = (theme) => mergeStyles(HintText.defaultThemeProps, theme.HintText.default);
const getStylesFromTheme = (themeValues, props) => ({
    root: {
        boxSizing: 'border-box',
        width: '100%'
    },
    text: {
        color: themeValues.textColor,
        display: 'block',
        lineHeight: themeValues.lineHeight,
        opacity: props.hidden ? 0 : 1,
        transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    }
});
const getStyles = gettingStyles(getThemeValues, getStylesFromTheme);

class HintText extends Component {
    static propTypes = {
        defaultTheme: PropTypes.shape(HintText.themePropTypes),
        hidden: PropTypes.bool,
        onClick: PropTypes.func,
        text: PropTypes.string
    };

    static defaultProps = {
        defaultTheme: {},
        hidden: false,
        onClick: () => {
        },
        text: '',
        style: {}
    };
    static themePropTypes = {
        lineHeight: PropTypes.number,
        textColor: PropTypes.string
    };
    static defaultThemeProps = {
        lineHeight: 1.5,
        textColor: 'rgba(0, 0, 0, 0.298039)'
    };
    static contextTypes = {
        theme: PropTypes.object
    };

    render() {
        // eslint-disable-next-line no-unused-vars
        const {text, hidden, defaultTheme, style, ...rest} = this.props;
        const {theme} = this.context;
        const styles = getStyles(this);

        return (
            <div style={theme.prepareStyles(styles.root)} {...rest}><span style={theme.prepareStyles(styles.text)}>{text}</span></div>
        );
    }
}
export default HintText;