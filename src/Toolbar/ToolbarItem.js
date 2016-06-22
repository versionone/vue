import React, {Component, PropTypes} from 'react';
import stylePropType from 'react-style-proptype';
import classNames from 'classnames';

export default class ToolbarItem extends Component {
    static propTypes = {
        children: PropTypes.arrayOf(PropTypes.element),
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        style: stylePropType,
        labelTextStyle: stylePropType
    };

    static defaultProps = {
        style: {}
    };

    render() {
        const {
            label,
            className,
            style,
            labelTextStyle,
            children
        } = this.props;
        const containerStyleComputed = Object.assign({}, ToolbarItem.defaultStyles.container, style);
        const labelStyleComputed = Object.assign({}, ToolbarItem.defaultStyles.label, {height: style.height});
        const labelChildrenWrapperStyleComputed = Object.assign({}, ToolbarItem.defaultStyles.labelText, labelTextStyle, {height: style.height});
        return (
            <div style={containerStyleComputed} className={classNames('toolbar-item', className)}>
                <label style={labelStyleComputed}>
                    <span
                        style={labelChildrenWrapperStyleComputed}>{label}:</span>
                    <div style={labelChildrenWrapperStyleComputed}>{children}</div>
                </label>
            </div>
        );
    }

    static defaultStyles = {
        container: {
            display: 'flex',
            alignItems: 'center',
            paddingRight: '24px'
        },
        label: {
            whiteSpace: 'nowrap',
            display: 'flex'
        },
        labelText: {
            alignItems: 'center',
            display: 'flex',
            fontSize: '18px',
            paddingRight: '12px'
        }
    }
}