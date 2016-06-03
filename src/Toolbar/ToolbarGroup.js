import React, {Component, PropTypes} from 'react';
import stylePropType from 'react-style-proptype';

export default class ToolbarGroup extends Component {
    static propTypes = {
        className: PropTypes.string,
        style: stylePropType,
        itemStyle: stylePropType,
        children: PropTypes.element
    };

    static defaultProps = {
        className: '',
        style: {},
        itemStyle: {}
    };

    render() {
        const {
            children,
            className,
            style,
            itemStyle
        } = this.props;
        const toolbarGroupStyle = Object.assign({}, ToolbarGroup.defaultStyles.container, style);
        const toolbarGroupListStyle = Object.assign({}, ToolbarGroup.defaultStyles.list);
        const toolbarGroupItemStyle = Object.assign({}, ToolbarGroup.defaultStyles.item, itemStyle);

        return (
            <div className={`toolbar-group ${className}`} style={toolbarGroupStyle}>
                <ol style={toolbarGroupListStyle}>
                    {React.Children.map(children, (child, index) => (
                        <li className="toolbar-group-item" style={toolbarGroupItemStyle} key={index}>{child}</li>
                    ))}
                </ol>
            </div>
        );
    }

    static defaultStyles = {
        container: {
            boxSizing: 'border-box',
            display: 'inline-block',
            width: '100%'
        },
        list: {
            display: 'flex'
        },
        item: {
            paddingRight: '0.5rem',
            display: 'inline-block',
            alignSelf: 'center'
        }
    };
}