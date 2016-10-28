import ThemeProvider, * as Theme from './';

suite('Theme module', () => {
    test('it exports a default ThemeProvider', () => {
        expect(ThemeProvider).to.not.be.undefined;
    });
    test('it exports the ability to get a theme', () => {
        expect(Theme.getTheme).to.not.be.undefined;
    });
    test('it exports a HOC withTheme', () => {
        expect(Theme.withTheme).to.not.be.undefined;
    });
});