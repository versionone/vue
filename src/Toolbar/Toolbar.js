import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import classNames from 'classnames';
import {zIndex} from './../Theme';

export const getStyles = (props, context) => {
    const {
        Toolbar
    } = context.theme;

    const height = props.height
        ? props.height
        : Toolbar.height;

    const background = props.background
        ? props.background
        : Toolbar.color;

    return {
        root: {
            height,
            boxSizing: 'border-box',
            fontFamily: Toolbar.fontFamily,
            display: 'flex',
            paddingLeft: Toolbar.padding,
            paddingRight: Toolbar.padding,
            background: background,
            color: Toolbar.textColor,
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
        children: PropTypes.node,
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