import { top, bottom, middle, center, left, right } from './Positions';

suite('Popover Position', () => {
    test('exports a top position value', () => {
        expect(top).to.not.be.undefined;
    });
    test('exports a bottom position value', () => {
        expect(bottom).to.not.be.undefined;
    });
    test('exports a middle position value', () => {
        expect(middle).to.not.be.undefined;
    });
    test('exports a center position value', () => {
        expect(center).to.not.be.undefined;
    });
    test('exports a left position value', () => {
        expect(left).to.not.be.undefined;
    });
    test('exports a right position value', () => {
        expect(right).to.not.be.undefined;
    });
});
