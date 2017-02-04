import toJson from 'enzyme-to-json';
import React, {PropTypes} from 'react';
import {combineReducers, createStore} from 'redux';
import {mount, render, shallow} from 'enzyme';
import {reducer as uiReducer} from 'redux-ui';
import theme from './TestTheme';

const reducer = combineReducers({
    ui: uiReducer,
});
const store = createStore(reducer);

export const getShallow = (Component) => (props = {}, context = {
    store,
    theme,
}) => shallow(<Component {...props} />, {context});

export const getRender = (Component) => (props = {}, context = {
    store,
    theme,
}) => render(<Component {...props} />, {
    context,
    childContextTypes: {
        store: PropTypes.object,
        theme: PropTypes.object,
    },
});

export const getMount = (Component) => (props = {}, context = {
    store,
    theme,
},) => mount(<Component {...props} />, {
    context,
    childContextTypes: {
        theme: PropTypes.object,
    },
});

export const snapshot = (renderedComponent) => toJson(renderedComponent);
