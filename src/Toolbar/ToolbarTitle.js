import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import classNames from 'classnames';

export const getStyles = (props, theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.ToolbarTitle.gutter,
        fontSize: theme.ToolbarTitle.fontSize,
        lineHeight: 1
    }
});

class ToolbarTitle extends Component {
    static propTypes = {
        children: PropTypes.node,
        text: PropTypes.string.isRequired,
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
            text,
            className,
            style
        } = this.props;
        const {prepareStyles} = this.context.theme;
        const styles = getStyles(this.props, this.context.theme);

        return (
            <div style={prepareStyles(styles.root, style)} className={classNames('toolbar-title', className)}>
                <span>{text}</span>
            </div>
        );
    }
}
export default ToolbarTitle;