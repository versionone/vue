import React, {PropTypes} from 'react';
import {combineReducers, createStore} from 'redux';
import {Provider} from 'react-redux';
import {reducer as uiReducer} from 'redux-ui';

const reducer = combineReducers({
    ui: uiReducer,
});
const store = createStore(reducer);
import ThemeProvider from './../ThemeProvider';
import V1Provider from './../V1Provider';

const VueProvider = (props) => (
    <V1Provider runQuery={props.runQuery}>
        <ThemeProvider theme={props.theme}>
            <Provider store={store}>
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
     * Theme to be used with Vue
     */
    theme: PropTypes.shape(ThemeProvider.themeDefinition).isRequired,
};
export default VueProvider;
