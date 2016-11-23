import ThemeProvider from './';

suite('Theme module', () => {
    test('it exports a default ThemeProvider', () => {
        expect(ThemeProvider).to.not.be.undefined;
    });
});
