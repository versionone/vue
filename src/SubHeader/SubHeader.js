import React, {PropTypes} from 'react';
import Radium from './../utilities/Radium';
import ThemeProvider from './../Theme';

const SubHeader = (props)=> {
    const {children} = props;

    return (
        <header>
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
SubHeader.contextTypes = {theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,};

export default Radium(SubHeader);
