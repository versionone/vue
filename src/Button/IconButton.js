import React, {PropTypes} from 'react';
import {normal} from './Sizes';
import Radium from './../utilities/Radium';
import transparent from './../utilities/Transparent';
import {create as createTransition} from './../styles/Transitions';

const getStyles = (props, theme) => ({
    root: {
        ':hover': {
            backgroundColor: Boolean(props.disabled) ? props.backgroundColor : props.hoverBackgroundColor,
        },
        backgroundColor: props.backgroundColor,
        border: (props.disabled && Boolean(props.border)) ? `1px solid ${theme.disabledPrimaryColor}` : Boolean(props.border) ? props.border : `1px solid ${transparent}`,
        borderRadius: props.circle ? '50%' : '0px',
        cursor: props.disabled ? 'not-allowed' : 'pointer',
        display: 'inline-block',
        lineHeight: 0.6,
        transition: props.transition,
    },
});

const handleEvent = (handler, {disabled}) => evt => {
    if (disabled) {
        return;
    }
    handler(evt);
};

const IconButton = (props, context) => {
    const {
        color,
        disabled,
        hoverColor,
        size,
    } = props;
    const {
        baseIconSize,
        disabledPrimaryColor,
        smallGutter,
    } = context.theme;

    const width = baseIconSize * size;
    const iconColor = disabled ? disabledPrimaryColor : color;
    const iconHoverColor = disabled ? disabledPrimaryColor : hoverColor;
    const styles = getStyles(props, context.theme);

    return (
        <div
            style={styles.root}
            onClick={handleEvent(props.onClick, props)}
        >
            {React.createElement(props.icon, {
                color: iconColor,
                hoverColor: iconHoverColor,
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
export default Radium(IconButton);
