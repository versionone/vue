import React from 'react';
import {mount} from 'enzyme';
import List from './List';
import ListItem from './ListItem';

suite('List', () => {
    test('it can render children ListItems', () => {
        const list = mountList({
            children: getChildren(),
        });
        expect(listHasItems(list, getChildrenText())).to.be.true;
    });
    test('it can have a specified hover colors for its ListItems', () => {
        const list = mountList({
            children: getChildren(),
            hoverBackgroundColor: 'blue',
            hoverColor: 'white',
        });
        simulateMouseEnterFirstListItem(list);
        expect(getFirstListItem(list)).to.have.style('backgroundColor', 'blue');
        expect(getFirstListItem(list)).to.have.style('color', 'white');

        simulateMouseLeaveFirstListItem(list);
        expect(getFirstListItem(list)).to.have.style('backgroundColor', 'rgba(0, 0, 0, 0)');
    });
});

function mountList(props = {}) {
    return mount(<List {...props} />);
}
function getChildren() {
    return getChildrenText()
        .map((child) => <ListItem>{child}</ListItem>);
}
function getChildrenText() {
    return [
        'Hello',
        'World',
    ]
}
function listHasItems(wrapper, items) {
    return wrapper.children().length === items.length
        && items.reduce((output, item, index) => output && wrapper.childAt(index).text() === item, true);
}
function getFirstListItem(wrapper) {
    return wrapper.find('ListItem').first().parent();
}
function simulateMouseEnterFirstListItem(wrapper) {
    getFirstListItem(wrapper).simulate('mouseenter');
}
function simulateMouseLeaveFirstListItem(wrapper) {
    getFirstListItem(wrapper).simulate('mouseleave');
}
