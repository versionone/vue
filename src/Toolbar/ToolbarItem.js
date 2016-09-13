import React, {Component, PropTypes} from 'react';
import  * as CustomPropTypes from './../utilities/PropTypes';
import classNames from 'classnames';

export const getStyles = (props, theme) => ({
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        paddingRight: theme.ToolbarItem.horizontalGutter
    },
    label: {
        whiteSpace: 'nowrap',
        display: 'flex'
    },
    labelText: {
        alignItems: 'center',
        display: 'flex',
        fontFamily: theme.ToolbarItem.fontFamily,
        fontSize: `${theme.ToolbarItem.labelFontSize}px`,
        paddingRight: theme.ToolbarItem.labelGutter
    }
});

class ToolbarItem extends Component {
    static propTypes = {
        children: PropTypes.node,
        label: PropTypes.string,
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
        const styles = getStyles(this.props, this.context.theme);
        const root = prepareStyles(styles.root, style);
        const labelChildrenWrapperStyleComputed = prepareStyles(styles.labelText, labelTextStyle, {height: style.height});
        const labelText = label && <span style={labelChildrenWrapperStyleComputed}>{label}:</span>;

        return (
            <div style={root} className={classNames('toolbar-item', className)}>
                <label style={prepareStyles(styles.label, {height: style.height})}>
                    {labelText}
                    <div style={labelChildrenWrapperStyleComputed}>{children}</div>
                </label>
            </div>
        );
    }
}
export default ToolbarItem;