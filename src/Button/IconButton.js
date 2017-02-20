import React, {PropTypes} from 'react';
import reduxUI from 'redux-ui';
import {normal} from './Sizes';
import Radium from './../utilities/Radium';
import transparent from './../utilities/Transparent';
import {create as createTransition} from '../utilities/Transitions';
import {createConditionalEventHandler, createEventHandlerIgnoringEventData} from './../utilities/component';

const getStyles = (props, theme) => {
    let border = `1px solid ${transparent}`;
    const hasBorderProp = Boolean(props.border);
    if (props.disabled && hasBorderProp) {
        border = `1px solid ${theme.disabledPrimaryColor}`;
    }
    else if (hasBorderProp) {
        border = props.border;
    }
    return {
        root: {
            backgroundColor: (Boolean(props.disabled) || (!props.hovered && !props.ui.hovered)) ? props.backgroundColor : props.hoverBackgroundColor,
            border,
            borderRadius: props.circle ? '50%' : '0px',
            cursor: props.disabled ? 'not-allowed' : 'pointer',
            display: 'inline-block',
            lineHeight: 0.6,
            transition: props.transition,
        },
    };
};

const IconButton = (props, context) => {
    const {
        color,
        disabled,
        hoverColor,
        hovered,
        ui,
        onClick,
        size,
        updateUI,
    } = props;
    const {
        baseIconSize,
        disabledPrimaryColor,
        smallGutter,
    } = context.theme;

    const width = baseIconSize * size;
    const iconColor = disabled ? disabledPrimaryColor : color;
    const iconHoverColor = disabled ? disabledPrimaryColor : hoverColor;
    const handleClick = createConditionalEventHandler(!disabled)(onClick);
    const handleMouseEnter = createEventHandlerIgnoringEventData(updateUI, 'hovered', true);
    const handleMouseLeave = createEventHandlerIgnoringEventData(updateUI, 'hovered', false);
    const styles = getStyles(props, context.theme);

    return (
        <div
            style={styles.root}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {React.createElement(props.icon, {
                color: iconColor,
                hoverColor: iconHoverColor,
                hovered: hovered || ui.hovered,
                padding: smallGutter,
                width,
            })}
        </div>
    );
};
IconButton.propTypes = {
    /**
     * Background color of button
     */
    backgroundColor: PropTypes.string,
    /**
     * Border of icon button
     */
    border: PropTypes.string,
    /**
     * Will render a circular button when true
     */
    circle: PropTypes.bool,
    /**
     * Color of the SvgIcon within button
     */
    color: PropTypes.string,
    /**
     * Disables the button from responding to event handlers
     */
    disabled: PropTypes.bool,
    /**
     * Background color when hovered
     */
    hoverBackgroundColor: PropTypes.string,
    /**
     * Hover color of SvgIcon
     */
    hoverColor: PropTypes.string,
    /**
     * Indicates the IconButton is in a hovered state when true
     */
    hovered: PropTypes.bool,
    /**
     * Icon to render within button
     */
    icon: PropTypes.func.isRequired,
    /**
     * Click event handler; fired once a button is clicked
     */
    onClick: PropTypes.func,
    /**
     * Numeric value used as a multiplier to the button's size; 0.75, 1, and 1.5 as examples
     */
    size: PropTypes.number,
    transition: PropTypes.string,
    /**
     * Managed UI state props; can be overridden
     */
    ui: PropTypes.object,
    /**
     * Callback fired when a ui prop related action is dispatched
     */
    updateUI: PropTypes.func.isRequired,
};
IconButton.defaultProps = {
    backgroundColor: transparent,
    circle: false,
    disabled: false,
    onClick: () => {
    },
    size: normal,
    transition: createTransition('0.25s', 'all', '0ms', 'linear'),
};
IconButton.contextTypes = {
    theme: PropTypes.object.isRequired,
};
IconButton.displayName = 'IconButton';
export default Radium(reduxUI({
    state: {
        hovered: false,
    },
})(IconButton));
