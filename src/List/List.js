import React, {PropTypes} from 'react';
import ui from 'redux-ui';
import ListItem from './ListItem';
import Radium from './../utilities/Radium';
import SubHeader from './../SubHeader';
import {ArrowDown, ArrowUp, Enter} from './../utilities/KeyCodes';
import * as CustomPropTypes from './../utilities/CustomPropTypes';

const handleHighlightItem = (index, updateUI, handler) => evt => {
    updateUI('highlightedIndex', index);
    handler(evt, index);
};
const getPreviousListItemIndex = (currentIndex, children) => {
    let previousIndex = currentIndex - 1;
    while (previousIndex >= 0 && children[previousIndex].type.displayName !== 'ListItem') {
        previousIndex -= 1;
    }
    return Math.max(1, previousIndex);
};
const getNextListItemIndex = (currentIndex, children) => {
    let nextIndex = currentIndex + 1;
    while (nextIndex < children.length && children[nextIndex].type.displayName !== 'ListItem') {
        nextIndex += 1;
    }
    return Math.min(children.length - 1, nextIndex);
};

const handleKeyUp = (currentIndex, props) => evt => {
    const {
        active,
        onHighlightItem,
        onSelectItem,
        updateUI
    } = props;

    if (!active) {
        return;
    }
    if (evt.keyCode === ArrowUp) {
        return handleHighlightItem(getPreviousListItemIndex(currentIndex, props.children), updateUI, onHighlightItem)(evt);
    }
    else if (evt.keyCode === ArrowDown) {
        return handleHighlightItem(getNextListItemIndex(currentIndex, props.children), updateUI, onHighlightItem)(evt);
    }
    else if (evt.keyCode === Enter) {
        return onSelectItem(evt, currentIndex);
    }
};

const getChildProps = (child, props, index) => {
    if (child.type.displayName === 'ListItem') {
        const highlightedIndex = props.ui.highlightedIndex || props.highlightedIndex || -1;
        return {
            highlightBackgroundColor: props.highlightBackgroundColor,
            highlightColor: props.highlightColor,
            highlighted: index === highlightedIndex,
            key: index,
            onMouseEnter: handleHighlightItem(index, props.updateUI, props.onHighlightItem),
            onKeyUp: handleKeyUp(highlightedIndex, props),
            tabIndex: index,
        };
    }
    return {
        key: index,
    };
};

const getStyles = (props, theme) => ({
    list: {
        backgroundColor: 'white',
        fontFamily: theme.basicFontFamily,
        fontSize: theme.smallFontSize,
        maxHeight: Boolean(props.maxHeight) && `${props.maxHeight}px`,
        overflow: 'auto',
    },
});

const List = (props, context) => {
    const {
        children,
        onMouseEnter,
        onMouseLeave,
        onSelectItem,
    } = props;
    const handleOnClick = (index) => (evt) => onSelectItem(evt, index);

    const styles = getStyles(props, context.theme);
    return (
        <div
            style={styles.list}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {React.Children
                .map(children, (child, index) =>
                    Boolean(child) && (
                        <div
                            onClick={handleOnClick(index)}
                        >
                            {React.cloneElement(child, getChildProps(child, props, index))}
                        </div>
                    )
                )
            }
        </div>
    );
};
List.propTypes = {
    /**
     * Indicates List should respond to keyup events
     */
    active: PropTypes.bool,
    /**
     * ListItem or SubHeader components.
     */
    children: CustomPropTypes.oneOfComponentType([
        ListItem,
        SubHeader,
    ]),
    /**
     * Background color used when list item is highlighted
     */
    highlightBackgroundColor: PropTypes.string,
    /**
     * Font color used on when list item is highlighted
     */
    highlightColor: PropTypes.string,
    /**
     * Index of the currently highlighted list item
     */
    highlightedIndex: PropTypes.number,
    /**
     * Maximum height of the list before a scroll bar
     */
    maxHeight: PropTypes.number,
    /**
     * Callback fired when an item is highlighted
     */
    onItemHighlighted: PropTypes.func,
    /**
     * Callback fired when mouse enters List
     */
    onMouseEnter: PropTypes.func,
    /**
     * Callback fired when mouse leaves list
     */
    onMouseLeave: PropTypes.func,
    /**
     * Callback fired when an item is selected
     */
    onSelectItem: PropTypes.func,
    /**
     * Managed UI state props; can be overridden
     */
    ui: PropTypes.shape({
        highlightedIndex: PropTypes.number,
    }),
};
List.defaultProps = {
    active: false,
    highlightBackgroundColor: '#262626',
    highlightColor: '#fff',
    onHighlightItem: () => {
    },
    onMouseEnter: () => {
    },
    onMouseLeave: () => {
    },
    onSelectItem: () => {
    }
};
List.contextTypes = {
    theme: PropTypes.object.isRequired,
};
List.displayName = 'List';

export default Radium(ui({
    key: 'List',
    state: {
        highlightedIndex: null,
    }
})(List));
