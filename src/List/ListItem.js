import React, {Component, PropTypes} from 'react';
import Radium from './../utilities/Radium';
import HoverCapable from './../utilities/HoverEnabled';

class ListItem extends Component {
    static propTypes = {
        /**
         * Content to render within the list item.
         */
        children: PropTypes.node.isRequired,
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
    static defaultProps = {
        onClick: () => {
        },
    };

    constructor(props, ...rest) {
        super(props, ...rest);
        this.state = {
            hovered: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.getStyles = this.getStyles.bind(this);
    }

    getStyles() {
        return {
            listItem: {
                backgroundColor: 'none',
                cursor: 'pointer',
                padding: `20px 16px 16px`,
            }
        };
    }

    handleClick(evt) {
        this.props.onClick(this.props.item);
    }

    render() {
        const {
            children,
        } = this.props;
        const styles = this.getStyles();

        return (
            <div
                style={styles.listItem}
                onClick={this.handleClick}
            >
                {children}
            </div>
        );
    }
}
export default Radium(HoverCapable(ListItem));
