import React from 'react';
import VersionOneUIProvider from './../VersionOneUIProvider';
import {getMount, snapshot} from './../../../testHelpers/rendering';

const shallowRender = getMount(VersionOneUIProvider);

test('VersionOneUIProvider provides the theme prop and V1 SDK prop to children via React\'s context', () => {
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
