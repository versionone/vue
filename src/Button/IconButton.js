import React, {PropTypes} from 'react';
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

const IconButton = (props) => {
    const {
        backgroundColor,
        circle,
    } = props;
    const styles = getStyles({
        backgroundColor,
        circle,
    });

    return (
        <div
            style={styles.root}
            onClick={handleIconClick(props.onClick)}
        >
            {React.createElement(props.icon, {
                color: props.color,
                hoverColor: props.hoverColor,
                width: props.width,
            })}
        </div>
    );
};
IconButton.defaultProps = {
    backgroundColor: transparent,
    circle: false,
    onClick: () => {
    },
    width: 24,
};
IconButton.propTypes = {
    backgroundColor: PropTypes.string,
    circle: PropTypes.bool,
    color: PropTypes.string,
    hoverColor: PropTypes.string,
    icon: PropTypes.func.isRequired,
    onClick: PropTypes.func,
    width: PropTypes.number,
};
export default Radium(IconButton);
