import React, {Component, PropTypes} from 'react';
import themedComponent from './../Theme/themedComponent';
import mergeStyles from './../Theme/mergeStyles';

const getThemeValues = (defaultThemeValues, {ErrorMessage}) => mergeStyles(defaultThemeValues, ErrorMessage);

const getDefaultStyles = (themeValues) => ({
    text: {
        color: themeValues.textColor,
        fontSize: `${themeValues.fontSize}px`,
        fontFamily: themeValues.fontFamily,
        transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
    }
});

const getRequiredStyles = (themeValues, props) => ({
    text: {
        opacity: props.hidden ? 0 : 1
    }
});

class ErrorMessage extends Component {
    static propTypes = {
        hidden: PropTypes.bool,
        onClick: PropTypes.func,
        text: PropTypes.string,
        theme: PropTypes.object
    };
    static defaultProps = {
        hidden: false,
        onClick: () => {
        },
        text: '',
        theme: {}
    };

    static themeProps = {
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
        const {text, hidden, ...rest} = this.props;
        const styles = this.getStyles(this);

        return (
            <div {...rest}><span style={styles.text}>{text}</span></div>
        );
    }
}
export default themedComponent(getThemeValues, getDefaultStyles, getRequiredStyles)(ErrorMessage);
