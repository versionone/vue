import React, {PropTypes} from 'react';
import TrackingHover from './../utilities/TrackingHover';
import Radium from './../utilities/Radium';

const getStyles = (props) => {
    const {
        color,
        hoverColor,
        hovered,
        transition,
        width,
    } = props;

    return {
        root: {
            fill: hovered ? hoverColor : color,
            height: `${width}px`,
            margin: 0,
            padding: 0,
            transition,
            width: `${width}px`,
        },
    };
};
const handleEvent = handler => evt => handler(evt);

const SvgIcon = (props) => {
    const {
        children,
        color,
        hoverColor,
        hovered,
        onClick,
        onMouseEnter,
        onMouseLeave,
        transition,
        width,
    } = props;
    const styles = getStyles({
        color,
        hoverColor,
        hovered,
        transition,
        width,
    });

    return (
        <svg
            style={styles.root}
            viewBox="0 0 24 24"
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
     * Indicates the SvgIcon is in a hovered state if true; false otherwise
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
     * Transition to apply to SVG; typically used for fill color on hover.
     */
    transition: PropTypes.string,
    /**
     * Width of the SVG; also applies this as the height.
     */
    width: PropTypes.number,
};
SvgIcon.defaultProps = {
    color: '#000',
    hoverColor: '#000',
    onClick: () => {},
    onMouseEnter: () => {},
    onMouseLeave: () => {},
    transition: 'fill 0.25s linear 0ms',
    width: 24,
};

export default Radium(TrackingHover(SvgIcon));
