import React, {Component, PropTypes} from 'react';
import  * as CustomPropTypes from './../utilities/PropTypes';
import classNames from 'classnames';

export const getStyles = (props, context) => ({
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        paddingRight: context.theme.ToolbarItem.padding
    },
    label: {
        whiteSpace: 'nowrap',
        display: 'flex'
    },
    labelText: {
        alignItems: 'center',
        display: 'flex',
        fontSize: context.theme.ToolbarItem.labelFontSize,
        paddingRight: context.theme.ToolbarItem.labelPadding
    }
});

export default class ToolbarItem extends Component {
    static propTypes = {
        children: PropTypes.node,
        label: PropTypes.string.isRequired,
        className: PropTypes.string,
        style: CustomPropTypes.style,
        labelTextStyle: CustomPropTypes.style
    };

    static defaultProps = {
        style: {},
        labelTextStyle: {}
    };

    static contextTypes = {
        theme: PropTypes.object.isRequired
    };

    render() {
        const {
            label,
            className,
            style,
            labelTextStyle,
            children
        } = this.props;
        const {prepareStyles} = this.context.theme;
        const styles = getStyles(this.props, this.context);
        const root = prepareStyles(styles.root, style);
        const labelChildrenWrapperStyleComputed = prepareStyles(styles.labelText, labelTextStyle, {height: style.height});

        return (
            <div style={root} className={classNames('toolbar-item', className)}>
                <label style={prepareStyles(styles.label, {height: style.height})}>
                    <span style={labelChildrenWrapperStyleComputed}>{label}:</span>
                    <div style={labelChildrenWrapperStyleComputed}>{children}</div>
                </label>
            </div>
        );
    }
}