import Chip from './../Chip';
import {getShallow, snapshot} from './../../../specHelpers/rendering';

const shallowRenderChip = getShallow(Chip);
const clickEvent = {test: true};

test('it can render text in the Chip', () => {
    const component = shallowRenderChip({
        text: 'Hello Chip',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('it can render as full width', () => {
    const component = shallowRenderChip({
        fullWidth: true,
        text: 'Hello Chip',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('it is click-able', () => {
    const onRequestRemove = jest.fn();
    const component = shallowRenderChip({
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
