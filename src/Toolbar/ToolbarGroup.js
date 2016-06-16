import React, {Component, PropTypes} from 'react';
import stylePropType from 'react-style-proptype';
import classNames from 'classnames';

export default class ToolbarGroup extends Component {
    static propTypes = {
        children: PropTypes.element,
        className: PropTypes.string,
        style: {...stylePropType, height: PropTypes.string.isRequired}
    };

    static defaultProps = {
        style: {},
        attachToRight: false
    };

    render() {
        const {
            children,
            className,
            style
        } = this.props;
        const toolbarGroupStyle = Object.assign({}, ToolbarGroup.defaultStyles.container, style);

        return (
            <div className={classNames('toolbar-group', className)} style={toolbarGroupStyle}>
                {React.Children.map(children, (child, index) => {
                    let childStyle;
                    if (child.type.name === 'ToolbarSeparator' || child.type.name === 'ToolbarItem') {
                         childStyle = Object.assign({}, {height: style.height}, child.props.style, {display: 'flex'});
                    } else {
                        childStyle = Object.assign({}, child.props.style, {display: 'flex'});
                    }
                    return React.cloneElement(child, {
                        key: index,
                        style: childStyle
                    })
                })}
            </div>
        );
    }

    static defaultStyles = {
        container: {
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center'
        }
    };
}