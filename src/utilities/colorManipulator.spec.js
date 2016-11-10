import {changeOpacity} from './colorManipulator';

suite('colorManipulator.changeOpacity', () => {
    test('the opacity can be changed for a color hex value', () => {
        const actual = changeOpacity('#000', 0.5);
        expect(actual).to.equal('rgba(0, 0, 0, 0.5)');
    });

    test('the opacity can be changed for a color rgb value', () => {
        const actual = changeOpacity('rgb(0, 0, 0)', 0.5);
        expect(actual).to.equal('rgba(0, 0, 0, 0.5)');
    });

    test('the opacity can be changed for a color rgba value', () => {
        const actual = changeOpacity('rgba(0, 0, 0, 0.75)', 0.5);
        expect(actual).to.equal('rgba(0, 0, 0, 0.5)');
    });

    test('the opacity can be changed for a color hsl value', () => {
        const actual = changeOpacity('hsl(0, 0%x, 0%)', 0.5);
        expect(actual).to.equal('rgba(0, 0, 0, 0.5)');
    });

    test('the opacity can be changed for a color hsla value', () => {
        const actual = changeOpacity('hsla(0, 0%, 0%, 0.75)', 0.5);
        expect(actual).to.equal('rgba(0, 0, 0, 0.5)');
    });
});
