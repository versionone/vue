import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import classNames from 'classnames';

const getStyles = (props, theme) => ({
    root: {
        display: 'inline-block',
        marginTop: 0,
        marginBottom: 0,
        marginRight: theme.ToolbarSeparator.horizontalGutter,
        marginLeft: theme.ToolbarSeparator.horizontalGutter,
        width: '1px',
        background: theme.ToolbarSeparator.borderColor
    }
});

class ToolbarSeparator extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: CustomPropTypes.style
    };

    static defaultProps = {
        style: {}
    };

    static contextTypes = {
        theme: PropTypes.object.isRequired
    };

    render() {
        const {
            className,
            style
        } = this.props;
        const {prepareStyles} = this.context.theme;
        const styles = getStyles(this.props, this.context.theme);

        return (
            <div className={classNames('toolbar-separator', className)} style={prepareStyles(styles.root, style)}></div>
        );
    }
}
export default ToolbarSeparator;
