import ButtonComponent from './../Button';
import ChipComponent from './../Chip';
import IconButtonComponent from './../Button/IconButton';
import ListComponent from './../List';
import LookupComponent from './../Lookup';
import PopoverComponent from './../Popover';
import SubHeaderComponent from './../SubHeader';
import TextFieldComponent from './../TextField';
import ThemeProviderComponent from './../Theme';
import {
    Button,
    ButtonSizes,
    ButtonTypes,
    Chip,
    IconButton,
    List,
    ListItem,
    Lookup,
    Popover,
    SubHeader,
    TextField,
    ThemeProvider
} from '../index';
import * as ButtonSizesImport from '../Button/Sizes';
import * as ButtonTypesImport from '../Button/Types';

test('vue exports the Button component and other related parts', () => {
    expect(new Button({})).toBeInstanceOf(ButtonComponent);
    expect(new IconButton({
        store: {
            getState: jest.fn(),
        },
    })).toBeInstanceOf(IconButtonComponent);
    expect(ButtonTypes).toEqual(ButtonTypesImport);
    expect(ButtonSizes).toEqual(ButtonSizesImport);
});
test('vue exports a Chip component', () => {
    expect(new Chip({})).toBeInstanceOf(ChipComponent);
});

test('vue exports a Popover component', () => {
    expect(new Popover({})).toBeInstanceOf(PopoverComponent);
});

test('vue exports a List component and other related parts', () => {
    expect(new List({
        store: {
            getState: jest.fn(),
        },
    })).toBeInstanceOf(ListComponent);
});

test('vue exports an ListItem component', () => {
    expect(new ListItem({})).toBeInstanceOf(ListItem);
});

test('vue exports an Lookup component', () => {
    expect(new Lookup({})).toBeInstanceOf(LookupComponent);
});

test('vue exports a SubHeader component', () => {
    expect(new SubHeader({})).toBeInstanceOf(SubHeaderComponent);
});

test('vue exports the TextField component', () => {
    expect(new TextField({})).toBeInstanceOf(TextFieldComponent);
});

test('vue exports the ThemeProvider component', () => {
    expect(new ThemeProvider()).toBeInstanceOf(ThemeProviderComponent);
});
