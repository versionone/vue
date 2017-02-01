import Chip from './';
import ChipComponent from './Chip';

suite('Chip', () => {
    test('it exports a Chip component from Vue', () => {
        expect(new Chip({})).to.be.an.instanceOf(ChipComponent);
    });
});
