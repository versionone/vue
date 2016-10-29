import React, {Component, PropTypes} from 'react';
import Radium from 'radium';

class HintText extends Component {
    static propTypes = {
        hidden: PropTypes.bool,
        onClick: PropTypes.func,
        text: PropTypes.string,
    };
    static defaultProps = {
        hidden: false,
        onClick: () => {
        },
        text: ''
    };
    static contextTypes = {
        theme: PropTypes.shape({
            typography: PropTypes.shape({
                basicFamily: PropTypes.string,
                small: PropTypes.number.isRequired,
                lineHeightNormal: PropTypes.number.isRequired
            }),
            color: PropTypes.shape({
                textSecondary: PropTypes.string
            })
        }).isRequired
    };

    render() {
        // eslint-disable-next-line no-unused-vars
        const {text, hidden, ...rest} = this.props;
        const styles = this.getStyles();

        return (
            <div style={styles.root} {...rest}>
                <span style={styles.text}>{text}</span>
            </div>
        );
    }

    getStyles = () => {
        const {hidden} = this.props;
        const {
            typography: {
                basicFamily,
                small,
                lineHeightNormal
            },
            color:{
                textSecondary
            }
        } = this.context.theme;

        return {
            root: {
                boxSizing: 'border-box',
                width: '100%'
            },
            text: {
                color: textSecondary,
                display: 'block',
                fontFamily: basicFamily,
                fontSize: small,
                lineHeight: lineHeightNormal,
                opacity: hidden ? 0 : 1,
                transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
            }
        };
    };
}
export default Radium(HintText);