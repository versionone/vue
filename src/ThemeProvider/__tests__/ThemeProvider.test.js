import React from 'react';
import ThemeProvider from '../ThemeProvider';
import v1Theme from './../../styles/themes/v1Theme';

test('ThemeProvider provides the theme prop to children via React\'s context', () => {
    const theme = getTheme();
    const themeProvider = new ThemeProvider({
        theme,
    });
    expect(themeProvider.getChildContext().theme).toEqual(theme);
});

test('ThemeProvider defaults to the v1Theme when no theme is provided', () => {
    expect(ThemeProvider.defaultProps.theme).toEqual(v1Theme);
});

function getTheme() {
    return {
        values: {
            _name: 'Test Theme',
            themeProperty: 'theme property value',
        },
    };
}
