import EventListener from 'react-event-listener';
import React, {Component, PropTypes} from 'react';
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

class ListItem extends Component {
    static propTypes = {
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
         * Event handler; fired once the item is highlighted AND a key is pressed
         */
        onKeyUp: PropTypes.func,
        /**
         * Event handler; fired once mouse enters the component
         */
        onMouseEnter: PropTypes.func,
    };

    static defaultProps = {
        highlighted: false,
        onClick: () => {
        },
        onMouseEnter: () => {
        },
        onKeyUp: () => {
        },
    };

    static contextTypes = {
        theme: PropTypes.object.isRequired,
    };

    constructor(...rest) {
        super(...rest);
        this.focusSelf = this.focusSelf.bind(this);
    }

    componentDidMount() {
        if (this.props.highlighted){
            this.focusSelf();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.highlighted){
            this.focusSelf();
        }
    }

    focusSelf() {
        this.root.focus();
    }

    render() {
        const {
            itemOid,
            onKeyUp,
            onMouseEnter,
        } = this.props;
        const handleMouseEnter = createEventHandler(onMouseEnter, itemOid);
        const handleKeyUp = createEventHandler(onKeyUp, itemOid);
        const styles = getStyles(this.props, this.context.theme);

        return (
            <div
                ref={(el) => {
                    this.root = el;
                }}
                style={styles.listItem}
                onMouseEnter={handleMouseEnter}
                onKeyUp={handleKeyUp}
            >
                <EventListener
                    target="window"
                    onKeyUp={handleKeyUp}
                />
                {this.props.children}
            </div>
        );
    }
}

export default Radium(ListItem);
