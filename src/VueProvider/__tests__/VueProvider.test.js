import React from 'react';
import VueProvider from './../VueProvider';
import {getMount, snapshot} from './../../../specHelpers/rendering';

const shallowRender = getMount(VueProvider);

test('VueProvider provides the theme prop and V1 SDK prop to children via React\'s context', () => {
    const theme = getTheme();
    const runQuery = jest.fn();
    const children = <span>Hello World</span>;

    const component = shallowRender({
        children,
        theme,
        runQuery,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

// ---

function getTheme() {
    return {
        values: {
            _name: 'Test Theme',
            themeProperty: 'theme property value',
        },
    };
}
