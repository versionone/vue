import React, {PropTypes} from 'react';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';
import transparent from './../utilities/Transparent';

const getStyles = (props, context) => {
    const {
        hovered,
    } = props;
    const {
        smallGutter,
        largeGutter,
    } = context.theme;
    const hoveredStyles = hovered
        ? {
            backgroundColor: props.hoverBackgroundColor,
            color: props.hoverColor,
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
const handleEvent = (oid, handler) => (evt) => {
    handler(oid, evt);
};

const ListItem = (props, context) => {
    const styles = getStyles(props, context);

    return (
        <div
            style={styles.listItem}
            onClick={handleEvent(props.itemOid, props.onClick)}
            onMouseEnter={handleEvent(props.itemOid, props.onMouseEnter)}
            onMouseLeave={handleEvent(props.itemOid, props.onMouseLeave)}
        >
            {props.children}
        </div>
    );
};
ListItem.propTypes = {
    /**
     * Content to render within the list item
     */
    children: PropTypes.node.isRequired,
    /**
     * Color of the background when in a hovered state
     */
    hoverBackgroundColor: PropTypes.string,
    /**
     * Color of the text when in a hovered state
     */
    hoverColor: PropTypes.string,
    /**
     * When true, indicates the component is in a hovered state
     */
    hovered: PropTypes.bool,
    /**
     * Data item that the ListItem is displaying
     */
    itemOid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    /**
     * Click event handler; fired once the ListItem is clicked
     */
    onClick: PropTypes.func,
    /**
     * Event handler; fired once mouse enters the component
     */
    onMouseEnter: PropTypes.func,
    /**
     * Event handler; fired once mouse leaves the component
     */
    onMouseLeave: PropTypes.func,
};
ListItem.defaultProps = {
    onClick: () => {
    },
    onMouseEnter: () => {
    },
    onMouseLeave: () => {
    }
};
ListItem.contextTypes = {
    theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
};
export default Radium(ListItem);
