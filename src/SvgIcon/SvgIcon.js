import React, {PropTypes} from 'react';
import {create as createTransition} from '../utilities/Transitions';
import Radium from './../utilities/Radium';

const getStyles = (props, theme) => {
    const {
        color,
        hoverColor,
        hovered,
        padding,
        transition,
        size,
    } = props;
    let iconSize = Boolean(size) ? size : theme.baseIconSize;

    return {
        root: {
            fill: hovered ? hoverColor : color,
            height: `${iconSize}px`,
            margin: 0,
            padding: `${padding}px`,
            transition,
            width: `${iconSize}px`,
        },
    };
};
const handleEvent = (handler) => (evt) => handler(evt);

const SvgIcon = (props, context) => {
    const {
        children,
        onClick,
        onMouseEnter,
        onMouseLeave,
    } = props;
    const styles = getStyles(props, context.theme);

    return (
        <svg
            style={styles.root}
            viewBox="0 0 16 16"
            x="0px"
            y="0px"
            onClick={handleEvent(onClick)}
            onMouseEnter={handleEvent(onMouseEnter)}
            onMouseLeave={handleEvent(onMouseLeave)}
        >
            {children}
        </svg>
    );
};
SvgIcon.contextTypes = {
    theme: PropTypes.object.isRequired,
};
SvgIcon.propTypes = {
    /**
     * SVG element's body to be rendered.
     */
    children: PropTypes.node.isRequired,
    /**
     * Fill color of the SVG.
     */
    color: PropTypes.string,
    /**
     * Fill color to apply when hovering over the SVG.
     */
    hoverColor: PropTypes.string,
    /**
     * Indicates the SvgIcon is in a hovered state when true
     */
    hovered: PropTypes.bool,
    /**
     * onClick event handler
     */
    onClick: PropTypes.func,
    /**
     * onMouseEnter event handler.
     */
    onMouseEnter: PropTypes.func,
    /**
     * onMouseLeave event handler.
     */
    onMouseLeave: PropTypes.func,
    /**
     * Number of pixels to pad icon
     */
    padding: PropTypes.number,
    /**
     * Width/Height of the SVG
     */
    size: PropTypes.number,
    /**
     * Transition to apply to SVG; typically used for fill color on hover
     */
    transition: PropTypes.string,
};
SvgIcon.defaultProps = {
    color: '#000',
    hoverColor: '#000',
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    padding: 0,
    transition: createTransition('0.25s', 'fill', '0ms', 'linear'),
};

export default Radium(SvgIcon);
