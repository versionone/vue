import Popover, { Positions } from './';
import PopoverComponent from './Popover';
import * as ExpectedPositions from './Positions';

suite('Popover', () => {
    test('a Popover component is publicly exported from Vue', () => {
        expect(new Popover({})).to.be.an.instanceOf(PopoverComponent);
    });

    test('Popover positions is exported from Vue', () => {
        expect(Positions).to.deep.equal(ExpectedPositions);
    });
});

