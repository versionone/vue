import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from '../utilities/PropTypes';

const getStyles = (theme, props) => {
    // TODO: pull out into theme/css/etc.
    const color = 'rgba(0, 0, 0, 0.298039)';

    return {
        root: {
            color,
            width: '100%',
            ...props.style,
            opacity: props.hidden ? 0 : 1,
            transition: 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
        }
    };
};

class HintText extends Component {
    static propTypes = {
        hidden: PropTypes.bool,
        text: PropTypes.string,
        style: CustomPropTypes.style
    };

    static defaultProps = {
        hidden: false,
        text: '',
        style: {}
    };

    render() {
        const {text} = this.props;
        const styles = getStyles(this.context.theme, this.props);
        return (
            <div style={styles.root}>{text}</div>
        );
    }
}
export default HintText;
