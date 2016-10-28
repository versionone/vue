import React, {Component, PropTypes} from 'react';
import {withTheme} from './../Theme';

class HintText extends Component {
    static propTypes = {
        hidden: PropTypes.bool,
        onClick: PropTypes.func,
        text: PropTypes.string,
        theme: PropTypes.shape({
            hintText: PropTypes.shape({
                color: PropTypes.string,
                lineHeight: PropTypes.number
            })
        }).isRequired
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
            <div style={styles.root} {...rest}>
                <span style={styles.text}>{text}</span>
            </div>
        );
    }

    getStyles = () => {
        const {hidden, theme} = this.props;
        const {
            color,
            lineHeight
        } = theme.hintText;
        return {
            root: {
                boxSizing: 'border-box',
                width: '100%'
            },
            text: {
                color,
                display: 'block',
                lineHeight,
                opacity: hidden ? 0 : 1,
                transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
            }
        };
    };

}
export default withTheme()(HintText);