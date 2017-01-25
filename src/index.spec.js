import ButtonComponent from './Button';
import TextFieldComponent from './TextField';
import ThemeProviderComponent from './Theme';
import PopoverComponent from './Popover';
import {Button, ButtonSizes, ButtonTypes, Popover, TextField, ThemeProvider} from './index';
import * as ButtonSizesImport from './Button/Sizes';
import * as ButtonTypesImport from './Button/Types';

suite('Vue', () => {
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

    test('vue exports a Popover component', () => {
        expect(new Popover({})).to.be.a.instanceOf(PopoverComponent);
    });
});
