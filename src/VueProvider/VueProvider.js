import React, {PropTypes} from 'react';
import ThemeProvider from './../ThemeProvider';
import V1Provider from './../V1Provider';

const VueProvider = (props) => (
    <V1Provider runQuery={props.runQuery}>
        <ThemeProvider theme={props.theme}>
            {props.children}
        </ThemeProvider>
    </V1Provider>
);
// VueProvider.displayName = 'VueProvider';
VueProvider.propTypes = {
    /**
     * Component(s) that are a parent to any child using Vue
     */
    children: PropTypes.node.isRequired,
    /**
     * Instance of the VersionOne JavaScript SDK
     */
    runQuery: PropTypes.func.isRequired,
    /**
     * Theme to be used with Vue
     */
    theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
};
export default VueProvider;
