import React, { PropTypes, } from 'react';
import * as CustomPropTypes from './../utilities/CustomPropTypes';
import Radium from './../utilities/Radium';
import SvgIcon from './../SvgIcon';
import transparent from './../utilities/Transparent';

const getStyles = props => ({
    root: {
        backgroundColor: props.backgroundColor,
        borderRadius: props.circle ? '50%' : '0px',
        cursor: 'pointer',
        lineHeight: 0.6,
    },
});

const handleIconClick = handler => evt => handler(evt);

const defaultProps = {
    backgroundColor: transparent,
    circle: false,
    width: 24,
    onClick: () => {
    },
};
const IconButton = (props) => {
    const propsWithDefaults = {
        ...defaultProps,
        ...props,
    };
    const styles = getStyles(propsWithDefaults);

    return (
        <div
            style={styles.root}
            onClick={handleIconClick(propsWithDefaults.onClick)}
        >
            {React.createElement(propsWithDefaults.icon, {
                color: propsWithDefaults.color,
                hoverColor: propsWithDefaults.hoverColor,
                width: propsWithDefaults.width,
            })}
        </div>
    );
};
IconButton.propTypes = {
    backgroundColor: PropTypes.string,
    circle: PropTypes.bool,
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    icon: CustomPropTypes.componentType(SvgIcon).isRequired,
    width: PropTypes.number,
    onClick: PropTypes.func,
};
export default Radium(IconButton);
