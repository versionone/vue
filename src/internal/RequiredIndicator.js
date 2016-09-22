import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from '../utilities/PropTypes';

const getStyles = (theme, props) => {
    // TODO: pull out into theme/css/etc.
    const color = 'red';

    return {
        root: {
            color,
            ...props.style,
            opacity: props.hidden ? 0 : 1,
            zIndex: 1,
            transition: 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms'
        }
    };
};

class RequiredIndicator extends Component {
    static propTypes = {
        hidden: PropTypes.bool,
        style: CustomPropTypes.style
    };

    static defaultProps = {
        hidden: false,
        style: {}
    };

    render() {
        const styles = getStyles(this.context.theme, this.props);
        return (
            <div style={styles.root}>*</div>
        );
    }
}
export default RequiredIndicator;
