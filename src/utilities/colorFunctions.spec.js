import {darken, emphasize, getForegroundForBackground, lighten, setOpacity, shade, tint} from './colorFunctions';

suite('emphasize', () => {
    test('default emphasis amount is 15% (0.15)', () => {
        const actual = emphasize('#36dd66');
        expect(actual).to.equal('rgba(120,232,152,1)');
    });
    test('a color can be emphasized by an amount', () => {
        const actual = emphasize('#36dd66', 0.25);
        expect(actual).to.equal('rgba(163,239,185,1)');
    });
    test('light colors cannot be emphasized beyond rgb(255,255,255)', () => {
        const actual = emphasize('#36dd66', 1);
        expect(actual).to.equal('rgba(255,255,255,1)');
    });
    test('dark colors cannot be emphasized beyond rgb(0,0,0)', () => {
        const actual = emphasize('#333', 1);
        expect(actual).to.equal('rgba(0,0,0,1)');
    });
});

suite('getFirstAppropriateForegroundColor', () => {
    test('it returns black for light colors when there is no match', () => {
        const foregroundColor = getForegroundForBackground('#fff');
        expect(foregroundColor).to.equal('rgba(0,0,0,1)');
    });
    test('it returns white for dark colors when there is no match', () => {
        const foregroundColor = getForegroundForBackground('#000');
        expect(foregroundColor).to.equal('rgba(255,255,255,1)');
    });
    test('it can get an appropriate foreground color for a light background when one exists', () => {
        const invertedColor = getForegroundForBackground('#fff', ['#eee', 'rgb(0, 0,0)']);
        expect(invertedColor).to.equal('rgba(0,0,0,1)');
    });
    test('it can get an appropriate foreground color for a dark background when one exists', () => {
        const invertedColor = getForegroundForBackground('#000', ['#000', 'hsl(0,0%,100%)']);
        expect(invertedColor).to.equal('rgba(255,255,255,1)');
    });
    test('invalid colors are skipped', () => {
        const invertedColor = getForegroundForBackground('#000', ['fhd', 'hsl(0,0%,100%)']);
        expect(invertedColor).to.equal('rgba(255,255,255,1)');
    });
});

suite('setOpacity', () => {
    test('returns a rgba string', () => {
        const actual = setOpacity('#000', 0.5);
        expect(actual).to.equal('rgba(0,0,0,0.5)');
    });
});
suite('darken', () => {
    test('returns a rgba string', () => {
        const actual = darken('#fff', 0.5);
        expect(actual).to.equal('rgba(128,128,128,1)');
    });
});
suite('lighten', () => {
    test('returns a rgba string', () => {
        const actual = lighten('#000', 0.5);
        expect(actual).to.equal('rgba(128,128,128,1)');
    });
});

suite('shade', () => {
    test('returns a rgba string', () => {
        const actual = shade('#fff', 0.5);
        expect(actual).to.equal('rgba(128,128,128,1)');
    });
});
suite('tint', () => {
    test('returns a rgba string', () => {
        const actual = tint('#000', 0.5);
        expect(actual).to.equal('rgba(128,128,128,1)');
    });
});

