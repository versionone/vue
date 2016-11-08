import {TextField, ThemeProvider, withTheme} from './index';

suite('vue exports', () => {
    test('vue exports the ThemeProvider component', () => {
        expect(ThemeProvider).to.not.be.undefined;
    });

    test('vue exports a way to overide themes for Vue components', () => {
        expect(withTheme).to.not.be.undefined;
    });

    test('vue exports the TextField component', () => {
        expect(TextField).to.not.be.undefined;
    });
});