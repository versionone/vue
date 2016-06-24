import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import classNames from 'classnames';
import * as zIndex from './../styles/zIndex';

export const getStyles = (props, context) => {
    const {
        toolbar
    } = context.theme;

    const height = props.height
        ? props.height
        : toolbar.height;

    const background = props.background
        ? props.background
        : toolbar.color;

    return {
        root: {
            height,
            boxSizing: 'border-box',
            display: 'flex',
            paddingLeft: toolbar.padding,
            paddingRight: toolbar.padding,
            background: background,
            color: toolbar.textColor,
            zIndex: zIndex.toolbar,
            position: 'relative'
        },
        children: {
            height,
            background: background
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