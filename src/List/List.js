import React, {PropTypes} from 'react';
import ListItem from './ListItem';
import Radium from './../utilities/Radium';
import SubHeader from './../SubHeader';
import * as CustomPropTypes from './../utilities/CustomPropTypes';

const getStyles = (props) => ({
    list: {
        backgroundColor: 'white',
        padding: `8px 0`,
    }
});

const defaultProps = {};
const List = (props) => {
    const propsWithDefaults = {
        ...defaultProps,
        ...props,
    };
    const {
        children,
        hoverBackgroundColor,
        hoverColor,
    } = propsWithDefaults;
    const styles = getStyles(propsWithDefaults);

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
    );
};
List.propTypes = {
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
export default Radium(List)
