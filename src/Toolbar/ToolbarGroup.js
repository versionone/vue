import React, {Component, PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/PropTypes';
import classNames from 'classnames';

export const getStyles = (props) => ({
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        height: props.style.height
    },
    toolbarChildren: {
        height: props.style.height,
        display: 'flex'
    },
    otherChildren: {
        display: 'flex'
    }
});

export default class ToolbarGroup extends Component {
    static propTypes = {
        children: PropTypes.node,
        className: PropTypes.string,
        style: CustomPropTypes.style
    };

    static defaultProps = {
        style: {},
        attachToRight: false
    };

    static contextTypes = {
        theme: PropTypes.object.isRequired
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
            <div className={classNames('toolbar-group', className)} style={prepareStyles(style, styles.root)}>
                {React.Children.map(children, (child, index) => {
                    let childStyle;
                    if (child.type.name === 'ToolbarSeparator' || child.type.name === 'ToolbarItem') {
                        childStyle = styles.toolbarChildren;
                    } else {
                        childStyle = styles.otherChildren;
                    }
                    return React.cloneElement(child, {
                        key: index,
                        style: prepareStyles(child.props.style, childStyle)
                    })
                })}
            </div>
        );
    }
}