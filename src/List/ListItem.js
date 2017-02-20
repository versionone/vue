import React, {PropTypes} from 'react';
import Radium from './../utilities/Radium';
import transparent from './../utilities/Transparent';
import {createEventHandler} from './../utilities/component';

const getStyles = (props, theme) => {
    const {
        highlighted,
    } = props;
    const {
        smallGutter,
        largeGutter,
    } = theme;
    const hoveredStyles = highlighted
        ? {
            backgroundColor: props.highlightBackgroundColor,
            color: props.highlightColor,
        } : {
            backgroundColor: transparent,
            color: 'initial',
        };

    return {
        listItem: {
            cursor: 'pointer',
            padding: `${smallGutter}px ${largeGutter}px`,
            ...hoveredStyles,
        },
    };
};

const ListItem = (props, context) => {
    const {
        children,
        oid,
        onMouseEnter,
    } = props;
    const handleMouseEnter = createEventHandler(onMouseEnter, oid);
    const styles = getStyles(props, context.theme);

    return (
        <div
            style={styles.listItem}
            onMouseEnter={handleMouseEnter}
        >
            {children}
        </div>
    );
};
ListItem.propTypes = {
    /**
     * Content to render within the list item
     */
    children: PropTypes.node.isRequired,
    /**
     * Color of the background when in a highlighted state
     */
    highlightBackgroundColor: PropTypes.string,
    /**
     * Color of the text when in a highlighted state
     */
    highlightColor: PropTypes.string,
    /**
     * When true, indicates the component is in a highlighted state
     */
    highlighted: PropTypes.bool,
    /**
     * Unique oid for the item represented by the ListItem
     */
    oid: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string,
    ]),
    /**
     * Event handler; fired once mouse enters the component
     */
    onMouseEnter: PropTypes.func,
};
ListItem.defaultProps = {
    highlighted: false,
    onMouseEnter: () => {
    },
};
ListItem.contextTypes = {
    theme: PropTypes.object.isRequired,
};
ListItem.displayName = 'ListItem';

export default Radium(ListItem);
