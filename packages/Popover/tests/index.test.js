import Popover from './../src';
import PopoverComponent from './../src/Popover';

test('a Popover component is exported as default', () => {
    expect(new Popover({})).toBeInstanceOf(PopoverComponent);
});

