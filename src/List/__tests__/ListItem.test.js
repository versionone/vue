import ListItem from '../ListItem';
import {getShallow, snapshot} from './../../../specHelpers/rendering';

const shallowRenderListItem = getShallow(ListItem);
const evt = {test: true};

test('ListItem can render as not highlighted', () => {
    const component = shallowRenderListItem({
        children: 'List Item',
        highlightBackgroundColor: 'blue',
        highlightColor: 'pink',
        oid: 'ListItem',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('ListItem can render as being highlighted', () => {
    const component = shallowRenderListItem({
        children: 'List Item',
        highlightBackgroundColor: 'blue',
        highlightColor: 'pink',
        highlighted: true,
        oid: 'ListItem',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('ListItem responds to hover event', () => {
    const onMouseEnter = jest.fn();
    const component = shallowRenderListItem({
        children: 'List Item',
        oid: 'ListItem',
        onMouseEnter,
    });
    simulateHover(component, evt);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledWith(evt, 'ListItem');
});

function simulateHover(wrapper, evt = {}) {
    wrapper.simulate('mouseenter', evt);
}
