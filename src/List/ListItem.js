import React, {PropTypes} from 'react';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';
import TrackingHover from './../utilities/TrackingHover';
import transparent from './../utilities/Transparent';

const getStyles = (props, context) => {
    const {
        hovered
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
const ListItem = (props, context) => {
    const propsWithDefaults = {
        ...defaultProps,
        ...props
    };
    const styles = getStyles(propsWithDefaults, context);

    return (
        <div
            style={styles.listItem}
            onClick={handleClick(propsWithDefaults.onClick, propsWithDefaults.itemOid)}
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
    itemOid: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
    ]).isRequired,
    /**
     * Click event handler; fired once the ListItem is clicked
     */
    onClick: PropTypes.func,
};
ListItem.contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,};
export default Radium(TrackingHover(ListItem));
