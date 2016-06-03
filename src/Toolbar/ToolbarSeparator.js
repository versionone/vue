import React, {Component, PropTypes} from 'react';
import stylePropType from 'react-style-proptype';
import classNames from 'classnames';

class ToolbarSeparator extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: {...stylePropType, height: PropTypes.string.isRequired}
    };

    static defaultProps = {
        style: {}
    };

    render() {
        const {
            className,
            style
        } = this.props;
        const separatorStyle = Object.assign({}, ToolbarSeparator.defaultStyles.container, style);
        return (
            <div className={classNames('toolbar-separator', className)} style={separatorStyle}></div>
        );
    }

    static defaultStyles = {
        container: {
            display: 'inline-block',
            margin: '0 18px',
            width: '1px',
            background: 'black'
        }
    };
}
export default ToolbarSeparator;
