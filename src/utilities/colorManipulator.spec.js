import {
    changeOpacity,
    convertColorToString,
    convertHexToRGB,
    decomposeColor,
    emphasize,
    getLuminance
} from './colorManipulator';

suite('colorManipulator.convertColorToString', () => {
    test('a rgb color can be converted to a string', () => {
        const actual = convertColorToString({
            type: 'rgb',
            values: [1, 0, 1]
        });
        expect(actual).to.equal('rgb(1,0,1)');
    });
    test('a rgba color can be converted to a string', () => {
        const actual = convertColorToString({
            type: 'rgba',
            values: [1, 4, 1, 0.5]
        });
        expect(actual).to.equal('rgba(1,4,1,0.5)');
    });
    test('a hsl color can be converted to a string', () => {
        const actual = convertColorToString({
            type: 'hsl',
            values: [2, 0.3, 0.45]
        });
        expect(actual).to.equal('hsl(2,30%,45%)');
    });
});

suite('colorManipulator.convertHexToRGB', () => {
    test('a short hex rbg combination can be converted to a RGB color', () => {
        const actual = convertHexToRGB('#000');
        expect(actual).to.equal('rgb(0,0,0)');
    });
    test('a long hex rbg combination can be converted to a color', () => {
        const actual = convertHexToRGB('#ffffFF');
        expect(actual).to.equal('rgb(255,255,255)');
    });
});

suite('colorManipulator.decomposeColor', () => {
    test('a short hex color string can be decomposed into a valid color object', () => {
        const actual = decomposeColor('#000');
        expect(actual).to.deep.equal({
            type: 'rgb',
            values: [0, 0, 0]
        });
    });
    test('a long hex color string can be decomposed into a valid color object', () => {
        const actual = decomposeColor('#ffffff');
        expect(actual).to.deep.equal({
            type: 'rgb',
            values: [255, 255, 255]
        });
    });
    test('a rgb color string can be decomposed into a valid color object', () => {
        const actual = decomposeColor('rgb(0, 0,0)');
        expect(actual).to.deep.equal({
            type: 'rgb',
            values: [0, 0, 0]
        });
    });
    test('a long rgba color string can be decomposed into a valid color object', () => {
        const actual = decomposeColor('rgba(0, 0,0, 0.25)');
        expect(actual).to.deep.equal({
            type: 'rgba',
            values: [0, 0, 0, 0.25]
        });
    });
    test('a long hsl color string can be decomposed into a valid color object', () => {
        const actual = decomposeColor('hsl(0, 11%,21.5%)');
        expect(actual).to.deep.equal({
            type: 'hsl',
            values: [0, 0.11, 0.215]
        });
    });
});

suite('colorManipulator.getLuminance', () => {
    test('a luminosity can be calculated from short and long hex colors', () => {
        const shortActual = getLuminance('#333');
        expect(shortActual).to.equal(0.033);
        const longActual = getLuminance('#303030');
        expect(longActual).to.equal(0.03);
    });
    test('a luminosity can be calculated from rgb and rgba colors', () => {
        const rgbActual = getLuminance('rgb(33, 33, 33)');
        expect(rgbActual).to.equal(0.015);

        const rgbaActual = getLuminance('rgba(33, 33, 33, 0.5)');
        expect(rgbaActual).to.equal(0.015);
    });
    test('a luminosity can be calculated from hsl color', () => {
        const actual = getLuminance('hsl(1, 20%, 30%)');
        expect(actual).to.equal(0.3);
    });
});

suite('colorManipulator.emphasize', () => {
    test('emphasis works with a light color ', () => {
        const shortHex = emphasize('#fff');
        expect(shortHex).to.equal('rgb(217,217,217)');
        const longHex = emphasize('#ffffff');
        expect(longHex).to.equal('rgb(217,217,217)');
        const rgb = emphasize('rgb(255,255, 255)');
        expect(rgb).to.equal('rgb(217,217,217)');
        const rgba = emphasize('rgba(255, 255, 255, 0.5)');
        expect(rgba).to.equal('rgba(217,217,217,0.5)');
        const hsl = emphasize('hsl(255, 10%, 100%)');
        expect(hsl).to.equal('hsl(255,10%,85%)');
    });
    test('emphasis works with a dark color', () => {

    });
});

suite('colorManipulator.changeOpacity', () => {
    test('the opacity can be changed for a color hex value', () => {
        const actual = changeOpacity('#000', 0.5);
        expect(actual).to.equal('rgba(0,0,0,0.5)');
    });

    test('the opacity can be changed for a color rgb value', () => {
        const actual = changeOpacity('rgb(0, 0, 0)', 0.5);
        expect(actual).to.equal('rgba(0,0,0,0.5)');
    });

    test('the opacity can be changed for a color rgba value', () => {
        const actual = changeOpacity('rgba(0, 0, 0, 0.75)', 0.5);
        expect(actual).to.equal('rgba(0,0,0,0.5)');
    });

    test('the opacity can be changed for a color hsl value', () => {
        const actual = changeOpacity('hsl(0, 0%x, 0%)', 0.5);
        expect(actual).to.equal('rgba(0,0,0,0.5)');
    });

    test('the opacity can be changed for a color hsla value', () => {
        const actual = changeOpacity('hsla(0, 0%, 0%, 0.75)', 0.5);
        expect(actual).to.equal('rgba(0,0,0,0.5)');
    });
});
