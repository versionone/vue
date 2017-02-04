import ListItem from '../ListItem';
import {getShallow, snapshot} from './../../../specHelpers/rendering';

const shallowRenderListItem = getShallow(ListItem);
const evt = {test: true};

test('ListItem can render as not highlighted', () => {
    const component = shallowRenderListItem({
        children: 'List Item',
        highlightBackgroundColor: 'blue',
        highlightColor: 'pink',
        itemOid: 'ListItem',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('ListItem can render as being highlighted', () => {
    const component = shallowRenderListItem({
        children: 'List Item',
        highlightBackgroundColor: 'blue',
        highlightColor: 'pink',
        highlighted: true,
        itemOid: 'ListItem',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('ListItem responds to hover event', () => {
    const onMouseEnter = jest.fn();
    const component = shallowRenderListItem({
        children: 'List Item',
        itemOid: 'ListItem',
        onMouseEnter,
    });
    simulateHover(component, evt);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledWith(evt, 'ListItem');
});

test('ListItem responds to keyup event', () => {
    const onKeyUp = jest.fn();
    const component = shallowRenderListItem({
        children: 'List Item',
        itemOid: 'ListItem',
        onKeyUp,
    });
    simulateKeyUp(component, evt);
    expect(onKeyUp).toHaveBeenCalledTimes(1);
    expect(onKeyUp).toHaveBeenCalledWith(evt, 'ListItem');
});

function simulateHover(wrapper, evt = {}) {
    wrapper.simulate('mouseenter', evt);
}
function simulateKeyUp(wrapper, evt = {}) {
    wrapper.simulate('keyup', evt);
}
