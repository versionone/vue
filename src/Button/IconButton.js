import React, {PropTypes} from 'react';
import * as CustomPropTypes from './../utilities/CustomPropTypes';
import SvgIcon from './../SvgIcon';

const getStyles = (props) => ({
    root: {
        backgroundColor: props.backgroundColor,
        borderRadius: props.circle ? '50%' : 0,
        lineHeight: 0.6,
    }
});

const defaultProps = {
    backgroundColor: 'green',
    circle: false,
    width: 24,
    onClick: () => {
    }
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
            onClick={propsWithDefaults.onClick}
        >
            {React.createElement(propsWithDefaults.icon, {
                width: propsWithDefaults.width,
            })}
        </div>
    );
};
IconButton.propTypes = {
    backgroundColor: PropTypes.string,
    circle: PropTypes.bool,
    width: PropTypes.number,
    icon: CustomPropTypes.componentType(SvgIcon).isRequired,
};
export default IconButton;
