import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import classNames from 'classnames';
import ToolbarTitle from './ToolbarTitle';
import ToolbarGroup from './ToolbarGroup';
import ToolbarItem from './ToolbarItem';
import ToolbarSeparator from './ToolbarSeparator';
import ToolbarSpacer from './ToolbarSpacer';

const getStyles = (props, theme) => {
    const height = props.height
        ? props.height
        : theme.Toolbar.height;

    const background = props.background
        ? props.background
        : theme.Toolbar.backgroundColor;

    return {
        root: {
            height,
            boxSizing: 'border-box',
            fontFamily: theme.Toolbar.fontFamily,
            display: 'flex',
            paddingLeft: theme.Toolbar.sidePadding,
            paddingRight: theme.Toolbar.sidePadding,
            background: background,
            color: theme.Toolbar.textColor,
            zIndex: 1100,
            position: 'relative'
        },
        children: {
            height
        }
    };
};

class Toolbar extends Component {
    static propTypes = {
        children: CustomPropTypes.oneOfComponentType([
            ToolbarTitle,
            ToolbarGroup,
            ToolbarItem,
            ToolbarSeparator,
            ToolbarSpacer
        ]),
        className: PropTypes.string,
        style: CustomPropTypes.style,
        height: PropTypes.number,
        background: PropTypes.string
    };

    static contextTypes = {
        theme: PropTypes.object.isRequired
    };

    static defaultProps = {
        style: {}
    };

    render() {
        const {
            children,
            className,
            style
        } = this.props;
        const {prepareStyles} = this.context.theme;
        const styles = getStyles(this.props, this.context.theme);

        return (
            <div className={classNames('toolbar', className)}
                 style={prepareStyles(styles.root, style)}>
                {React.Children.map(children, (child, index) => React.cloneElement(child, {
                    key: index,
                    style: prepareStyles(styles.children, child.props.style)
                }))}
            </div>
        );
    }
}
export default Toolbar;