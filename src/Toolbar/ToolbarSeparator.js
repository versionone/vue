import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import classNames from 'classnames';

export const getStyles = (props, context) => ({
    root: {
        display: 'inline-block',
        marginTop: 0,
        marginBottom: 0,
        marginRight: context.theme.ToolbarSeparator.padding,
        marginLeft: context.theme.ToolbarSeparator.padding,
        width: '1px',
        background: context.theme.ToolbarSeparator.color
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
        const styles = getStyles(this.props, this.context);

        return (
            <div className={classNames('toolbar-separator', className)} style={prepareStyles(styles.root, style)}></div>
        );
    }
}
export default ToolbarSeparator;
