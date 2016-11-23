import {Button, ButtonSizes, ButtonTypes, TextField, ThemeProvider} from './index';

suite('vue exports', () => {
    test('vue exports the ThemeProvider component', () => {
        expect(ThemeProvider).to.not.be.undefined;
    });

    test('vue exports the TextField component', () => {
        expect(TextField).to.not.be.undefined;
    });

    test('vue exports the Button component', () => {
        expect(Button).to.not.be.undefined;
        expect(ButtonTypes).to.not.be.undefined;
        expect(ButtonSizes).to.not.be.undefined;
    });
});
