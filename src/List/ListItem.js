import React, {PropTypes} from 'react';
import Radium from './../utilities/Radium';
import TrackingHover from './../utilities/TrackingHover';

const getStyles = (props) => {
    const {
        hovered
    } = props;
    const hoveredStyles = hovered
        ? {
            backgroundColor: props.hoverBackgroundColor,
            color: props.hoverColor,
        } : {};

    return {
        listItem: {
            backgroundColor: 'none',
            cursor: 'pointer',
            padding: `20px 16px 16px`,
            ...hoveredStyles,
        }
    };
};
const handleClick = (handler, item) => () => {
    handler(item);
};

const defaultProps = {
    onClick: () => {
    },
};
const ListItem = (props) => {
    const propsWithDefaults = {
        ...defaultProps,
        ...props
    };
    const styles = getStyles(propsWithDefaults);

    return (
        <div
            style={styles.listItem}
            onClick={handleClick(propsWithDefaults.onClick, propsWithDefaults.item)}
        >
            {propsWithDefaults.children}
        </div>
    );
};
ListItem.propTypes = {
    /**
     * Content to render within the list item
     */
    children: PropTypes.node.isRequired,
    /**
     * When true, indicates the component is in a hovered state
     */
    hovered: PropTypes.bool,
    /**
     * Color of the background when in a hovered state
     */
    hoverBackgroundColor: PropTypes.string,
    /**
     * Color of the text when in a hovered state
     */
    hoverColor: PropTypes.string,
    /**
     * Data item that the ListItem is displaying
     */
    item: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            oid: PropTypes.string,
        }),
    ]),
    /**
     * Click event handler; fired once the ListItem is clicked
     */
    onClick: PropTypes.func,
};
export default Radium(TrackingHover(ListItem));
