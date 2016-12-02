import {emphasize, getForegroundForBackground} from './colorFunctions';

suite('emphasize', () => {
    test('default emphasis amount is 15% (0.15)', () => {
        const actual = emphasize('#36dd66');
        expect(actual).to.deep.equal({
            alpha: 1,
            b: 152,
            g: 232,
            r: 120,
            type: 'rgba'
        });
    });
    test('a color can be emphasized by an amount', () => {
        const actual = emphasize('#36dd66', 0.25);
        expect(actual).to.deep.equal({
            alpha: 1,
            b: 185,
            g: 239,
            r: 163,
            type: 'rgba'
        });
    });
    test('light colors cannot be emphasized beyond rgb(255,255,255)', () => {
        const actual = emphasize('#36dd66', 1);
        expect(actual).to.deep.equal({
            alpha: 1,
            b: 255,
            g: 255,
            r: 255,
            type: 'rgba'
        });
    });
    test('dark colors cannot be emphasized beyond rgb(0,0,0)', () => {
        const actual = emphasize('#333', 1);
        expect(actual).to.deep.equal({
            alpha: 1,
            b: 0,
            g: 0,
            r: 0,
            type: 'rgba'
        });
    });
});

suite('getFirstAppropriateForegroundColor', () => {
    test('it returns black for light colors when there is no match', () => {
        const foregroundColor = getForegroundForBackground('#fff');
        expect(foregroundColor).to.equal('#000000');
    });
    test('it returns white for dark colors when there is no match', () => {
        const foregroundColor = getForegroundForBackground('#000');
        expect(foregroundColor).to.equal('#ffffff');
    });
    test('it can get an appropriate foreground color for a light background when one exists', () => {
        const invertedColor = getForegroundForBackground('#fff', ['#eee', 'rgb(0, 0,0)']);
        expect(invertedColor).to.equal('rgb(0, 0,0)');
    });
    test('it can get an appropriate foreground color for a dark background when one exists', () => {
        const invertedColor = getForegroundForBackground('#000', ['#000', 'hsl(0,0%,100%)']);
        expect(invertedColor).to.equal('hsl(0,0%,100%)');
    });
});
