import {toRgbaString} from '@andrew-codes/color-functions';
import {
    emphasize,
    getForegroundForBackground
} from './colorManipulator';

suite('colorManipulator.emphasize', () => {
    test('emphasis works with a light color ', () => {
        const shortHex = emphasize('#fff');
        expect(toRgbaString(shortHex)).to.equal('rgba(217,217,217,1)');
        const longHex = emphasize('#ffffff');
        expect(toRgbaString(longHex)).to.equal('rgba(217,217,217,1)');
        const rgb = emphasize('rgb(255,255, 255)');
        expect(toRgbaString(rgb)).to.equal('rgba(217,217,217,1)');
        const rgba = emphasize('rgba(255, 255, 255, 0.5)');
        expect(toRgbaString(rgba)).to.equal('rgba(217,217,217,0.5)');
        const hsl = emphasize('hsl(255, 10%, 100%)');
        expect(toRgbaString(hsl)).to.equal('rgba(215,213,221,1)');
    });
    test.skip('emphasis works with a dark color', () => {

    });
});

suite('colorManipulator.getFirstAppropriateForegroundColor', () => {
    test('it can get an appropriate foreground color even none of the ones passed in match', () => {
        const foregroundColor = getForegroundForBackground('#fff');
        expect(foregroundColor).to.equal('rgba(0,0,0,1)');
    });
    test('it can get an appropriate foreground color for a light background when one exists', () => {
        const invertedColor = getForegroundForBackground('#fff', ['#eee', '#000']);
        expect(invertedColor).to.equal('#000');
    });
    test('it can get an appropriate foreground color for a dark background when one exists', () => {
        const invertedColor = getForegroundForBackground('#000', ['#000', '#fff']);
        expect(invertedColor).to.equal('#fff');
    });
});
