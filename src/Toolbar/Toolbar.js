import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import classNames from 'classnames';
import {zIndex} from './../Theme';

const getStyles = (props, context) => {
    const {
        spacing, typography, palette
    } = context.theme;

    const height = props.height
        ? props.height
        : spacing.desktopToolbarHeight;

    const background = props.background
        ? props.background
        : palette.primary3Color;

    return {
        root: {
            height,
            boxSizing: 'border-box',
            fontFamily: typography.fontFamily,
            display: 'flex',
            paddingLeft: spacing.desktopGutter,
            paddingRight: spacing.desktopGutter,
            background: background,
            color: palette.textColor,
            zIndex: zIndex.toolbar,
            position: 'relative'
        },
        children: {
            height
        }
    };
};

export default class Toolbar extends Component {
    static propTypes = {

        // /**
        //  * The content of the popover.
        //  */
        // children: CustomPropTypes.oneOfComponentType(
        //     [
        //         ToolbarTitle,
        //         ToolbarGroup,
        //         ToolbarItem,
        //         ToolbarSeparator,
        //         ToolbarSpacer
        //     ]
        // ),
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
        const styles = getStyles(this.props, this.context);

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