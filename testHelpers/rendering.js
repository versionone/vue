import toJson from 'enzyme-to-json';
import React, {PropTypes} from 'react';
import {mount, render, shallow} from 'enzyme';
import theme from './../packages/themes/src/V1Theme';

const ctx = {
    theme,
};

export const getShallow = (Component) => (props = {}, context = {}) => shallow(<Component {...props} />, {
    childContextTypes: {
        theme: PropTypes.object,
    },
    context: {
        ...ctx,
        ...context,
    },
});

export const getRender = (Component) => (props = {}, context = {}) => render(<Component {...props} />, {
    childContextTypes: {
        theme: PropTypes.object,
    },
    context: {
        ...ctx,
        ...context,
    },
});

export const getMount = (Component) => (props = {}, options = {}, context = {}) => mount(<Component {...props} />, {
    childContextTypes: {
        theme: PropTypes.object,
    },
    context: {
        ...ctx,
        ...context,
    },
    ...options,
});

const replaceUIKey = (componentName) => {
    let index = 0;
    return (json) => {
        if (!json.props || !json.props.uiKey) {
            return json;
        }
        const uiKey = `${componentName}-${index}`;
        index += 1;
        return Object.assign({}, json, {
            uiKey,
            uiPath: [uiKey],
        });
    };
};
const replaceUiKeyRecursively = (json) => {
    if (!json.type) {
        return json;
    }
    const replaceUIKeyInParent = replaceUIKey(json.type);
    const output = replaceUIKeyInParent(json);
    if (!output.children) {
        return json;
    }
    output.children = json.children.map((child, index) => replaceUiKeyRecursively(child));
    return output;
};

export const snapshot = (renderedComponent) => {
    return toJson(renderedComponent);
};

export const reset = (component) => () => {
    if (component) {
        component.unmount();
    }
    document.body.innerHTML = '';
};
