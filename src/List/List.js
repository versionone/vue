import EventListener from 'react-event-listener';
import React, {Component, PropTypes} from 'react';
import scrollIntoView from 'scroll-into-view';
import reduxUI from 'redux-ui';
import ListItem from './ListItem';
import Radium from './../utilities/Radium';
import SubHeader from './../SubHeader';
import {createConditionalEventHandler} from './../utilities/component';
import {ArrowDown, ArrowUp, Enter} from './../utilities/KeyCodes';
import * as CustomPropTypes from './../utilities/CustomPropTypes';

const noSelectedItemIndex = -1;
const lowestSelectedItemIndex = 0;
const selectedItemIndexIncrement = 1;

class List extends Component {
    constructor(...rest) {
        super(...rest);
        this.listItemEls = {};

        this.getChildProps = this.getChildProps.bind(this);
        this.getCurrentIndex = this.getCurrentIndex.bind(this);
        this.getNextListItemIndex = this.getNextListItemIndex.bind(this);
        this.getPreviousListItemIndex = this.getPreviousListItemIndex.bind(this);
        this.highlightItem = this.highlightItem.bind(this);
        this.scrollToHighlightedItem = this.scrollToHighlightedItem.bind(this);

        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleMouseEnterItem = this.handleMouseEnterItem.bind(this);

        this.getStyles = this.getStyles.bind(this);
    }

    componentDidMount() {
        this.scrollToHighlightedItem();
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.highlightedIndex !== nextProps.highlightedIndex || this.props.ui.highlightedIndex !== nextProps.ui.highlightedIndex) {
            this.scrollToHighlightedItem();
        }
    }

    getChildProps(child, index) {
        if (child.type.displayName === 'ListItem') {
            const {
                highlightBackgroundColor,
                highlightColor,
            } = this.props;
            const highlightedIndex = this.getCurrentIndex();
            return {
                highlightBackgroundColor,
                highlightColor,
                highlighted: index === highlightedIndex,
                key: index,
                onMouseEnter: this.handleMouseEnterItem(index),
            };
        }
        return {
            key: index,
        };
    }

    getCurrentIndex() {
        return this.props.ui.highlightedIndex || this.props.highlightedIndex || noSelectedItemIndex;
    }

    getNextListItemIndex() {
        let nextIndex = this.getCurrentIndex() + selectedItemIndexIncrement;
        while (nextIndex < this.props.children.length && this.props.children[nextIndex].type.displayName !== 'ListItem') {
            nextIndex += selectedItemIndexIncrement;
        }
        return Math.min(this.props.children.length - selectedItemIndexIncrement, nextIndex);
    }

    getPreviousListItemIndex() {
        let previousIndex = this.getCurrentIndex() - selectedItemIndexIncrement;
        while (previousIndex >= lowestSelectedItemIndex && this.props.children[previousIndex].type.displayName !== 'ListItem') {
            previousIndex -= selectedItemIndexIncrement;
        }
        return Math.max(selectedItemIndexIncrement, previousIndex);
    }

    highlightItem(evt, index, keyboardTriggered = false) {
        this.props.updateUI({
            highlightedIndex: index,
            keyboardTriggered,
        });
        this.props.onHighlightItem(evt, index);
    }

    scrollToHighlightedItem() {
        const {
            ui,
        } = this.props;
        if (!ui.keyboardTriggered) {
            return;
        }
        const highlightedIndex = this.getCurrentIndex();
        const highlightedEl = this.listItemEls[highlightedIndex];
        if (!highlightedEl) {
            return;
        }
        scrollIntoView(highlightedEl);
    }

    handleKeyDown(evt) {
        const {
            active,
        } = this.props;

        if (!active) {
            return null;
        }

        if (evt.keyCode === ArrowUp) {
            return this.highlightItem(evt, this.getPreviousListItemIndex(), true);
        }
        else if (evt.keyCode === ArrowDown) {
            return this.highlightItem(evt, this.getNextListItemIndex(), true);
        }
        return null;
    }

    handleKeyUp(evt) {
        const {
            active,
            onSelectItem,
        } = this.props;

        if (!active) {
            return null;
        }
        if (evt.keyCode === Enter) {
            return onSelectItem(evt, this.getCurrentIndex(this.props));
        }
        return null;
    }

    handleMouseEnterItem(index) {
        return (evt) => this.highlightItem(evt, index);
    }

    getStyles() {
        const {
            maxHeight,
        } = this.props;
        const {
            theme,
        } = this.context;

        return {
            list: {
                backgroundColor: 'white',
                fontFamily: theme.basicFontFamily,
                fontSize: theme.smallFontSize,
                maxHeight: Boolean(maxHeight) && `${maxHeight}px`,
                overflow: 'auto',
            },
        };
    }

    render() {
        const {
            children,
            onMouseEnter,
            onMouseLeave,
            onSelectItem,
        } = this.props;
        const styles = this.getStyles();

        return (
            <div
                style={styles.list}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
                <EventListener
                    target="window"
                    onKeyDown={this.handleKeyDown}
                    onKeyUp={this.handleKeyUp}
                />
                {React.Children
                    .map(children, (child, index) => Boolean(child)
                        && (
                            <div
                                ref={(el) => {
                                    this.listItemEls[index] = el;
                                }}
                                onClick={createConditionalEventHandler(child.type.displayName === 'ListItem')(onSelectItem, index)}
                            >
                                {React.cloneElement(child, this.getChildProps(child, index))}
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
    onHighlightItem: PropTypes.func,
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
    /**
     * Callback fired when a ui prop related action is dispatched
     */
    updateUI: PropTypes.func,
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
    },
    updateUI: () => {
    },
};
List.contextTypes = {
    theme: PropTypes.object.isRequired,
};
List.displayName = 'List';

export default Radium(reduxUI({
    state: {
        highlightedIndex: null,
        keyboardTriggered: false,
    },
})(List));
