import {Button, ButtonSizes, ButtonTypes, TextField, ThemeProvider} from './index';
import ThemeProviderComponent from './Theme';
import TextFieldComponent from './TextField';
import ButtonComponent from './Button';
import * as ButtonSizesImport from './Button/Sizes';
import * as ButtonTypesImport from './Button/Types';

suite('vue exports', () => {
    test('vue exports the ThemeProvider component', () => {
        expect(new ThemeProvider()).to.be.a.instanceOf(ThemeProviderComponent);
    });

    test('vue exports the TextField component', () => {
        expect(new TextField({})).to.be.a.instanceOf(TextFieldComponent);
    });

    test('vue exports the Button component and other related parts', () => {
        expect(new Button({})).to.be.a.instanceOf(ButtonComponent);
        expect(ButtonTypes).to.deep.equal(ButtonTypesImport);
        expect(ButtonSizes).to.deep.equal(ButtonSizesImport);
    });
});
