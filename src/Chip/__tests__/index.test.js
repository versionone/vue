import Chip from './../';
import ChipComponent from '../Chip';

test('a Chip component is exported', () => {
    expect(new Chip({})).toBeInstanceOf(ChipComponent);
});
