import React from 'react';
import {V1Theme} from '@versionone/ui-themes';
import ThemeProvider from '../src/ThemeProvider';

test('ThemeProvider provides the theme prop to children via React\'s context', () => {
    const theme = getTheme();
    const themeProvider = new ThemeProvider({
        theme,
    });
    expect(themeProvider.getChildContext().theme).toEqual(theme);
});

test('ThemeProvider defaults to the v1Theme when no theme is provided', () => {
    expect(ThemeProvider.defaultProps.theme).toEqual(V1Theme);
});

function getTheme() {
    return {
        values: {
            _name: 'Test Theme',
            themeProperty: 'theme property value',
        },
    };
}
