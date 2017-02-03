import Chip from './../Chip';
import {getRender, snapshot} from './../../../specHelpers/rendering';

const renderChip = getRender(Chip);
const clickEvent = {test: true};

test('it can render text in the Chip', () => {
    const component = renderChip({
        text: 'Hello Chip',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('it is click-able', () => {
    const onRequestRemove = jest.fn();
    const component = renderChip({
        text: 'Hello Chip',
        onRequestRemove,
    });
    simulateRemoveChipClick(component, clickEvent);
    expect(onRequestRemove).toHaveBeenCalledTimes(1);
    expect(onRequestRemove).toHaveBeenCalledWith(clickEvent, 'Hello Chip');
});

function simulateRemoveChipClick(wrapper, evt = {}) {
    wrapper.find('IconButton').simulate('click', evt);
}
