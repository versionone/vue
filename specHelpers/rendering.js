import toJson from 'enzyme-to-json';
import React, {PropTypes} from 'react';
import {combineReducers, createStore} from 'redux';
import Enzyme, { mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import {reducer as uiReducer} from 'redux-ui';
import theme from './../src/styles/themes/v1Theme';

Enzyme.configure({ adapter: new Adapter() });

const reducer = combineReducers({
    ui: uiReducer,
});
const store = createStore(reducer);
const ctx = {
    store,
    theme,
    runQuery: jest.fn().mockReturnValue(Promise.resolve([])),
};

export const getShallow = Component => (props = {}, context = {}) => shallow(<Component {...props} />, {
    context: {
        ...ctx,
        ...context,
    },
    childContextTypes: {
        store: PropTypes.object,
        theme: PropTypes.object,
        runQuery: PropTypes.func,
    },
});

export const getRender = Component => (props = {}, context = {}) => render(<Component {...props} />, {
    context: {
        ...ctx,
        ...context,
    },
    childContextTypes: {
        store: PropTypes.object,
        theme: PropTypes.object,
        runQuery: PropTypes.func,
    },
});

export const getMount = Component => (props = {}, options = {}, context = {}) => mount(<Component {...props} />, {
    context: {
        ...ctx,
        ...context,
    },
    childContextTypes: {
        store: PropTypes.object,
        theme: PropTypes.object,
        runQuery: PropTypes.func,
    },
    ...options,
});

const replaceUIKey = componentName => {
    let index = 0;
    return json => {
        if (!Boolean(json.props) || !Boolean(json.props.uiKey)) {
            return json;
        }
        const uiKey = `${componentName}-${index}`;
        json.props.uiKey = uiKey;
        json.props.uiPath = [uiKey];
        index += 1;
        return json;
    };
};
const replaceUiKeyRecursively = (json) => {
    if (!Boolean(json.type)) {
        return json;
    }
    const replaceUIKeyInParent = replaceUIKey(json.type);
    json = replaceUIKeyInParent(json);
    if (!Boolean(json.children)) {
        return json;
    }
    json.children = json.children.map((child, index) => replaceUiKeyRecursively(child));
    return json;
};

const removeReduxUIGeneratedParts = (json) => {
    if (!Boolean(json.children)
        || json.children === 0
        || json.children[0].type !== 'UI'
        || !Boolean(json.children[0].props)
        || !Boolean(json.children[0].props.ui)) {
        return json;
    }
    json.children[0].props.ui = json.children[0].props.ui.mapKeys(key => {
        if (key.indexOf('reducer') >= 0) {
            return key;
        }
        return 'Component';
    });
    json.children[0].children = json.children[0].children.map(replaceUiKeyRecursively);
    return json;
};

export const snapshot = renderedComponent => {
    const componentJson = toJson(renderedComponent);
    const componentWithoutReduxUIKeys = removeReduxUIGeneratedParts(componentJson);
    return componentWithoutReduxUIKeys;
};

export const reset = component => () => {
    if (Boolean(component)) {
        component.unmount();
    }
    document.body.innerHTML = '';
};
