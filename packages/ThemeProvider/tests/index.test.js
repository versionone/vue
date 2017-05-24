import ThemeProvider from './../src';
import ExpectedThemeProvider from './../src/ThemeProvider';

test('ThemeProvider is exported as default', () => {
    expect(new ThemeProvider({})).toBeInstanceOf(ExpectedThemeProvider);
});
