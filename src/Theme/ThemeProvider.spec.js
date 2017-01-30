import React from 'react';
import ThemeProvider from './ThemeProvider';
import v1Theme from './../styles/themes/v1Theme';

suite('ThemeProvider', () => {
    test('the ThemeProvider provides the passed in theme to children via React\'s context', () => {
        const theme = getTheme();
        const themeProvider = new ThemeProvider({theme});
        expect(themeProvider.getChildContext().theme).to.deep.equal(theme);
    });

    test('it defaults to use the v1Theme if no theme is provided', () => {
        expect(ThemeProvider.defaultProps.theme).to.deep.equal(v1Theme);
    });
});

function getTheme() {
    return {
        values: {
            _name: 'Test Theme',
            themeProperty: 'theme property value'
        }
    };
}
