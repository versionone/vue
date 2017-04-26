import AssetLookupComponent from './../AssetLookup';
import ButtonComponent from './../Button';
import ChipComponent from './../Chip';
import IconButtonComponent from './../IconButton';
import ListComponent from './../List';
import LookupComponent from './../Lookup';
import PopoverComponent from './../Popover';
import SubHeaderComponent from './../SubHeader';
import TextFieldComponent from './../TextField';
import ThemeProviderComponent from './../ThemeProvider';
import VersionOneUIProvider from './../VersionOneUIProvider';
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
    VersionOneUIProvider,
    V1Provider
} from '../index';
import * as ButtonSizesImport from '../Button/Sizes';
import * as ButtonTypesImport from '../Button/Types';

test('VersionOne UI exports an AssetLookup component', () => {
    expect(AssetLookup).toEqual(AssetLookupComponent);
});

test('VersionOne UI exports the Button component and other related parts', () => {
    expect(new Button({})).toBeInstanceOf(ButtonComponent);
    expect(new IconButton({
        store: {
            getState: jest.fn(),
        },
    })).toBeInstanceOf(IconButtonComponent);
    expect(ButtonTypes).toEqual(ButtonTypesImport);
    expect(ButtonSizes).toEqual(ButtonSizesImport);
});

test('VersionOne UI exports a Chip component', () => {
    expect(new Chip({})).toBeInstanceOf(ChipComponent);
});

test('VersionOne UI exports a Popover component', () => {
    expect(new Popover({})).toBeInstanceOf(PopoverComponent);
});

test('VersionOne UI exports a List component and other related parts', () => {
    expect(new List({
        store: {
            getState: jest.fn(),
        },
    })).toBeInstanceOf(ListComponent);
});

test('VersionOne UI exports an ListItem component', () => {
    expect(new ListItem({})).toBeInstanceOf(ListItem);
});

test('VersionOne UI exports an Lookup component', () => {
    expect(new Lookup({})).toBeInstanceOf(LookupComponent);
});

test('VersionOne UI exports a SubHeader component', () => {
    expect(new SubHeader({})).toBeInstanceOf(SubHeaderComponent);
});

test('VersionOne UI exports the TextField component', () => {
    expect(new TextField({})).toBeInstanceOf(TextFieldComponent);
});

test('VersionOne UI exports the ThemeProvider component', () => {
    expect(new ThemeProvider()).toBeInstanceOf(ThemeProviderComponent);
});

test('VersionOne UI exports the VersionOneUIProvider component', () => {
    expect(VersionOneUIProvider).toBeDefined();
});

test('VersionOne UI exports the V1Provider component', () => {
    expect(new V1Provider()).toBeInstanceOf(V1ProviderComponent);
});
