import React, {Component, PropTypes} from 'react';
import scrollIntoView from 'scroll-into-view';
import ui from 'redux-ui';
import ListItem from './ListItem';
import Radium from './../utilities/Radium';
import SubHeader from './../SubHeader';
import {createConditionalEventHandler} from './../utilities/component';
import {ArrowDown, ArrowUp, Enter} from './../utilities/KeyCodes';
import * as CustomPropTypes from './../utilities/CustomPropTypes';

const handleHighlightItem = (index, updateUI, handler, keyboardTriggered = false) => evt => {
    updateUI({highlightedIndex: index, keyboardTriggered});
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
        return handleHighlightItem(getPreviousListItemIndex(currentIndex, props.children), updateUI, onHighlightItem, true)(evt);
    }
    else if (evt.keyCode === ArrowDown) {
        return handleHighlightItem(getNextListItemIndex(currentIndex, props.children), updateUI, onHighlightItem, true)(evt);
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

class List extends Component {
    constructor(...rest) {
        super(...rest);
        this.listItemEls = {};

        this.scrollToHighlightedItem = this.scrollToHighlightedItem.bind(this);
    }

    componentDidMount() {
        this.scrollToHighlightedItem();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.highlightedIndex !== nextProps.highlightedIndex || this.props.ui.highlightedIndex !== nextProps.ui.highlightedIndex) {
            this.scrollToHighlightedItem();
        }
    }

    scrollToHighlightedItem() {
        const {
            highlightedIndex,
            ui,
        } = this.props;
        if (!ui.keyboardTriggered) {
            return;
        }
        const highlightedItemIndex = ui.highlightedIndex || highlightedIndex;
        const highlightedEl = this.listItemEls[highlightedItemIndex];
        if (!Boolean(highlightedEl)) {
            return;
        }
        scrollIntoView(highlightedEl);
    }

    render() {
        const {
            children,
            onMouseEnter,
            onMouseLeave,
            onSelectItem,
        } = this.props;
        const styles = getStyles(this.props, this.context.theme);

        return (
            <div
                style={styles.list}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                {React.Children
                    .map(children, (child, index) => Boolean(child) && (
                            <div
                                ref={(el) => {
                                    this.listItemEls[index] = el;
                                }}
                                onClick={createConditionalEventHandler(child.type.displayName === 'ListItem')(onSelectItem, index)}
                            >
                                {React.cloneElement(child, getChildProps(child, this.props, index))}
                            </div>
                        )
                    )
                }
            </div>
        );
    }
}
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
        keyboardTriggered: PropTypes.bool,
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
    state: {
        highlightedIndex: null,
        keyboardTriggered: false,
    }
})(List));
