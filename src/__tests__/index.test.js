import AssetLookupComponent from './../Lookup/AssetLookup';
import ButtonComponent from './../Button';
import ChipComponent from './../Chip';
import IconButtonComponent from './../IconButton';
import ListComponent from './../List';
import LookupComponent from './../Lookup';
import PopoverComponent from './../Popover';
import SubHeaderComponent from './../SubHeader';
import TextFieldComponent from './../TextField';
import ThemeProviderComponent from './../ThemeProvider';
import VueProviderComponent from './../VueProvider';
import V1ProviderComponent from './../V1Provider';
import {
    AssetLookup,
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
    ThemeProvider,
    VueProvider,
    V1Provider
} from '../index';
import * as ButtonSizesImport from '../Button/Sizes';
import * as ButtonTypesImport from '../Button/Types';

test('vue exports an AssetLookup component', () => {
    expect(new AssetLookup({}, {
        query: jest.fn().mockReturnValue(Promise.resolve([])),
    })).toBeInstanceOf(AssetLookupComponent);
});

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

test('vue exports the VueProvider component', () => {
    expect(VueProvider).toBeDefined();
});

test('vue exports the V1Provider component', () => {
    expect(new V1Provider()).toBeInstanceOf(V1ProviderComponent);
});
