import {configure, setAddon, addDecorator} from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import addStoriesGroup from 'react-storybook-addon-add-stories-group';
import {combineReducers, createStore} from 'redux';
import {reducer as uiReducer} from 'redux-ui';
import VueProvider from './../src/VueProvider';
import v1Theme from './../src/styles/themes/v1Theme';
import React from 'react';
import './index.css';

const reducer = combineReducers({
    ui: uiReducer,
});
const store = createStore(reducer);
const runQuery = () => null;

setAddon(infoAddon);
setAddon(addStoriesGroup);

addDecorator((story) => (
    <div style={{marginTop: '30px'}}>
        <VueProvider
            runQuery={runQuery}
            store={store}
            theme={v1Theme}
        >
            {story()}
        </VueProvider>
    </div>
));

const req = require.context('./../', true, /Stories\.js$/);

function loadStories() {
    req.keys().forEach(req);
}

configure(loadStories, module);
