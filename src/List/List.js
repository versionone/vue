import React, {PropTypes} from 'react';
import ListItem from './ListItem';
import Radium from './../utilities/Radium';
import SubHeader from './../SubHeader';
import ThemeProvider from './../Theme';
import * as CustomPropTypes from './../utilities/CustomPropTypes';

const getStyles = (props, context) => ({
    list: {
        backgroundColor: 'white',
        fontFamily: context.theme.basicFontFamily,
        fontSize: context.theme.smallFontSize,
        maxHeight: Boolean(props.maxHeight) && `${props.maxHeight}px`,
        overflow: 'auto',
    },
});

const List = (props, context) => {
    const {
        children,
        hoverBackgroundColor,
        hoverColor,
        maxHeight,
    } = props;
    const styles = getStyles({
        maxHeight,
    }, context);

    return (
        <div
            style={styles.list}
        >
            {React.Children
                .map(children, child => Boolean(child) && React.cloneElement(child, {
                    hoverBackgroundColor,
                    hoverColor,
                }))
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
        SubHeader,
    ]),
    /**
     * Background color used on hovered list items.
     */
    hoverBackgroundColor: PropTypes.string,
    /**
     * Font color used on hovered list items.
     */
    hoverColor: PropTypes.string,
    /**
     * Maximum height of the list before a scroll bar
     */
    maxHeight: PropTypes.number,
};
List.defaultProps = {
    hoverBackgroundColor: '#262626',
    hoverColor: '#fff',
};
List.contextTypes = {
    theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
};
export default Radium(List);
