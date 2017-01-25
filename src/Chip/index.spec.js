import Chip from './';
import ChipComponent from './Chip';

suite('List', () => {
    test('it exports a Chip component from Vue', () => {
        expect(new Chip({})).to.be.a.instanceOf(ChipComponent);
    });
});
