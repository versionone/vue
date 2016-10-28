import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import withTheme from './../Theme/withTheme';

class ErrorMessage extends Component {
    static propTypes = {
        defaultTheme: PropTypes.shape(ErrorMessage.themePropTypes),
        hidden: PropTypes.bool,
        onClick: PropTypes.func,
        text: PropTypes.string,
        theme: PropTypes.shape({
            errorMessage: PropTypes.shape({
                color: PropTypes.string,
                font: CustomPropTypes.font,
                lineHeight: PropTypes.number
            })
        })
    };
    static defaultProps = {
        hidden: false,
        onClick: () => {
        },
        text: ''
    };

    render() {
        // eslint-disable-next-line no-unused-vars
        const {text, theme, hidden, ...rest} = this.props;
        const styles = this.getStyles();

        return (
            <div {...rest}><span style={styles.text}>{text}</span></div>
        );
    }

    getStyles = () => {
        const {hidden, theme} = this.props;
        const {color, font, lineHeight} = theme.errorMessage;

        return {
            text: {
                color,
                display: 'block',
                font,
                lineHeight: lineHeight,
                opacity: hidden ? 0 : 1,
                transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
            }
        };
    };
}
export default withTheme()(ErrorMessage);
