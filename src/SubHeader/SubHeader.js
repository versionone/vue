import React, {PropTypes} from 'react';
import Radium from './../utilities/Radium';
import transparent from './../utilities/Transparent';

const getStyles = (props, context) => ({
    root: {
        backgroundColor: transparent,
        borderBottom: '1px dashed #a6a6a6',
        color: '#a6a6a6',
        padding: `${context.theme.smallGutter}px ${context.theme.largeGutter}px`,
        textTransform: 'uppercase',
    },
});

const SubHeader = (props, context) => {
    const {
        children,
    } = props;
    const styles = getStyles(props, context);

    return (
        <header style={styles.root}>
            {children}
        </header>
    );
};
SubHeader.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.node,
    ]),
};
SubHeader.contextTypes = {
    theme: PropTypes.object.isRequired,
};

export default Radium(SubHeader);
