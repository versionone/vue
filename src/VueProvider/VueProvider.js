import React, {PropTypes} from 'react';
import {Provider} from 'react-redux';
import ThemeProvider from './../ThemeProvider';
import V1Provider from './../V1Provider';

const VueProvider = (props, context) => (
    <V1Provider runQuery={props.runQuery}>
        <ThemeProvider theme={props.theme}>
            <Provider store={context.store ? context.store : props.store}>
                {props.children}
            </Provider>
        </ThemeProvider>
    </V1Provider>
);
// VueProvider.displayName = 'VueProvider';
VueProvider.propTypes = {
    /**
     * Instance of the VersionOne JavaScript SDK
     */
    runQuery: PropTypes.func.isRequired,
    /**
     * A redux store with `ui` state segment property.
     */
    store: PropTypes.shape({
        dispatch: PropTypes.func.isRequired,
        getState: PropTypes.func.isRequired,
    }),
    /**
     * Theme to be used with Vue
     */
    theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
};
export default VueProvider;
