import React, {Component, PropTypes} from 'react';
import ListItem from './ListItem';
import Radium from './../utilities/Radium';
import SubHeader from './../SubHeader';
import transparent from './../utilities/Transparent';
import * as CustomPropTypes from './../utilities/CustomPropTypes';

class List extends Component {
    static propTypes = {
        /**
         * ListItem or SubHeader components.
         */
        children: CustomPropTypes.oneOfComponentType([
            ListItem,
            SubHeader
        ]),
        /**
         * Background color used on hovered list items.
         */
        hoverBackgroundColor: PropTypes.string,
        /**
         * Font color used on hovered list items.
         */
        hoverColor: PropTypes.string,
    };
    static defaultProps = {
        hoverBackgroundColor: transparent,
    };

    constructor(props, ...rest) {
        super(props, ...rest);
        this.getStyles = this.getStyles.bind(this);
    }

    getStyles() {
        return {
            list: {
                backgroundColor: 'white',
                padding: `8px 0`,
            }
        };
    }

    render() {
        const {
            children,
            hoverBackgroundColor,
            hoverColor,
        } = this.props;
        const styles = this.getStyles();

        return (
            <div
                style={styles.list}>
                {React.Children
                    .map(children, (child) => {
                        if (!Boolean(child)) {
                            return;
                        }
                        return React.cloneElement(child, {
                            hoverBackgroundColor,
                            hoverColor,
                        });
                    })
                }
            </div>
        )
    }
}
export default Radium(List)
