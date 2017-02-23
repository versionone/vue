import React from 'react';
import VueProvider from './../VueProvider';
import {getShallow, snapshot} from './../../../specHelpers/rendering';

jest.mock('./../../ThemeProvider');
const shallowRender = getShallow(VueProvider);

test('VueProvider provides the theme prop to children via React\'s context', () => {
    const theme = getTheme();
    const children = <span>Hello World</span>;
    const themeProvider = require('./../../ThemeProvider');
    shallowRender({
        children,
        theme,
    });
    expect(themeProvider.default).toHaveBeenCalledWith({
        children,
        theme,
    });
});

test('VueProvider provides the V1 SDK prop to children via React\'s context', () => {
    const sdk = {
        query: jest.fn()
    };
    const component = new VueProvider({
        sdk,
    });
    expect(component.getChildContext()).toEqual({
        sdk,
    });
});

// ---

function getTheme() {
    return {
        values: {
            _name: 'Test Theme',
            themeProperty: 'theme property value'
        }
    };
}
