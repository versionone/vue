import Popover, {Positions} from './../';
import PopoverComponent from './../Popover';
import * as ExpectedPositions from './../Positions';

test('a Popover component is exported as default', () => {
    expect(new Popover({})).toBeInstanceOf(PopoverComponent);
});

test('Popover positions are exported', () => {
    expect(Positions).toEqual(ExpectedPositions);
});

