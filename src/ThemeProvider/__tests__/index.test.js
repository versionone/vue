import ThemeProvider from './../';
import ExpectedThemeProvider from './../ThemeProvider';

test('ThemeProvider is exported as default', () => {
    expect(new ThemeProvider({})).toBeInstanceOf(ExpectedThemeProvider);
});
