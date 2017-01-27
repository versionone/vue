import React, {PropTypes,} from 'react';
import TrackingHover from './../utilities/TrackingHover';
import Radium from './../utilities/Radium';

const getStyles = (props) => {
    const {
        color,
        hovered,
        hoverColor,
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

const defaultTransition = 'fill 0.25s linear 0ms';
const defaultProps = {
    color: '#000',
    transition: defaultTransition,
    width: 24,
};
const SvgIcon = (props) => {
    const propsWithDefaults = {
        ...defaultProps,
        ...props,
    };
    const {children,} = propsWithDefaults;
    const styles = getStyles(propsWithDefaults);
    const eventHandlerProps = Object.keys(propsWithDefaults)
        .filter(key => key.startsWith('on'))
        .reduce((output, key) => ({
            ...output,
            [key]: propsWithDefaults[key],
        }), {});

    return (
        <svg
            {...eventHandlerProps}
            style={styles.root}
            viewBox="0 0 24 24"
            x="0px"
            y="0px"
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
     *
     */
    hovered: PropTypes.bool,
    /**
     * Fill color to apply when hovering over the SVG.
     */
    hoverColor: PropTypes.string,
    /**
     * Transition to apply to SVG; typically used for fill color on hover.
     */
    transition: PropTypes.string,
    /**
     * Width of the SVG; also applies this as the height.
     */
    width: PropTypes.number,
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
};

export default Radium(TrackingHover(SvgIcon));
