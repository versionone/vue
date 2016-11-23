import React from 'react';
import ThemeProvider from './ThemeProvider';

suite('ThemeProvider', () => {
    test('the ThemeProvider provides the passed in theme to children via React\'s context', () => {
        const theme = getTheme();
        const themeProvider = new ThemeProvider({theme});
        expect(themeProvider.getChildContext()).to.deep.equal({theme});
    });
});

function getTheme() {
    return {
        values: {
            _name: 'test theme',
            themeProperty: 'theme property value'
        }
    };
}
