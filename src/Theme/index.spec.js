import {ThemeProvider, withTheme} from './';

suite('Theme module', () => {
    test('it exports a default ThemeProvider', () => {
        expect(ThemeProvider).to.not.be.undefined;
    });

    test('it exports a HOC withTheme', () => {
        expect(withTheme).to.not.be.undefined;
    });
});