import React from 'react';
import { mount } from 'enzyme';
import List from './List';
import ListItem from './ListItem';

suite('List', () => {
    test('it can render children ListItems', () => {
        const list = mountList({ children: getChildren(), });
        expect(listHasItems(list, getChildrenText())).to.be.true;
    });
    test('it can have a specified hover colors for its ListItems', () => {
        const list = mountList({
            children: getChildren(),
            hoverBackgroundColor: 'blue',
            hoverColor: 'white'
        });
        expect(listItemsToHaveHoverColors(list, 'white', 'blue')).to.be.true;
    });
});

function mountList(props = {}) {
    return mount(<List {...props} />);
}
function getChildren() {
    return getChildrenText()
        .map(child => <ListItem>{child}</ListItem>);
}
function getChildrenText() {
    return [
        'Hello',
        'World'
    ];
}
function listHasItems(wrapper, items) {
    return wrapper.children().length === items.length
        && items.reduce((output, item, index) => output && wrapper.childAt(index).text() === item, true);
}
function listItemsToHaveHoverColors(wrapper, hoverColor, hoverBackgroundColor) {
    return wrapper.find('ListItem').reduce((output, listItem) => output
        && listItem.props().hoverColor === hoverColor
        && listItem.props().hoverBackgroundColor === hoverBackgroundColor,
        true);
}
