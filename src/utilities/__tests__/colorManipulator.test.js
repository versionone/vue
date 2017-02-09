import {toRgbaString} from '@andrew-codes/color-functions';
import {emphasize, getForegroundForBackground} from '../colorManipulator';

test('emphasis works with a light colors ', () => {
    const shortHex = emphasize('#fff');
    expect(toRgbaString(shortHex)).toEqual('rgba(217,217,217,1)');
    const longHex = emphasize('#ffffff');
    expect(toRgbaString(longHex)).toEqual('rgba(217,217,217,1)');
    const rgb = emphasize('rgb(255,255, 255)');
    expect(toRgbaString(rgb)).toEqual('rgba(217,217,217,1)');
    const rgba = emphasize('rgba(255, 255, 255, 0.5)');
    expect(toRgbaString(rgba)).toEqual('rgba(217,217,217,0.5)');
    const hsl = emphasize('hsl(255, 10%, 100%)');
    expect(toRgbaString(hsl)).toEqual('rgba(215,213,221,1)');
});
test('emphasis works with a dark color', () => {
    const shortHex = emphasize('#000');
    expect(toRgbaString(shortHex)).toEqual('rgba(38,38,38,1)');
    const longHex = emphasize('#000000');
    expect(toRgbaString(longHex)).toEqual('rgba(38,38,38,1)');
    const rgb = emphasize('rgb(0,0, 0)');
    expect(toRgbaString(rgb)).toEqual('rgba(38,38,38,1)');
    const rgba = emphasize('rgba(0, 0, 0, 0.5)');
    expect(toRgbaString(rgba)).toEqual('rgba(38,38,38,0.5)');
    const hsl = emphasize('hsl(0, 0%, 0%)');
    expect(toRgbaString(hsl)).toEqual('rgba(38,38,38,1)');
});

test('it can get an appropriate foreground color even none of the ones passed in match', () => {
    const foregroundColor = getForegroundForBackground('#fff');
    expect(foregroundColor).toEqual('rgba(0,0,0,1)');
});
test('it can get an appropriate foreground color for a light background when one exists', () => {
    const invertedColor = getForegroundForBackground('#fff', ['#eee', '#000']);
    expect(invertedColor).toEqual('#000');
});
test('it can get an appropriate foreground color for a dark background when one exists', () => {
    const invertedColor = getForegroundForBackground('#000', ['#000', '#fff']);
    expect(invertedColor).toEqual('#fff');
});
