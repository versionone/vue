import React from 'react';
import List from './../List';
import ListItem from './../ListItem';
import SubHeader from './../../SubHeader';
import {getMount, getShallow, snapshot} from './../../../specHelpers/rendering';

const renderList = getShallow(List);
const mountList = getMount(List);
const evt = {test: true};

let component;
afterEach(() => {
    component.unmount();
    document.body.innerHTML = '';
});

test('List can render ListItems', () => {
    component = renderList({
        children: getListItems(),
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('List can have a specified highlight color for its ListItems', () => {
    component = renderList({
        children: getListItems(),
        highlightBackgroundColor: 'blue',
        highlightColor: 'white',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('List\'s highlighted item can be set', () => {
    component = renderList({
        children: getListItems(),
        highlightBackgroundColor: 'blue',
        highlightColor: 'white',
        ui: {
            highlightedIndex: 1,
        },
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('List\'s list items are highlighted when hovered over', () => {
    component = renderList({
        children: getListItems(),
        highlightBackgroundColor: 'blue',
        highlightColor: 'white',
    });
    simulateHover(component);
    expect(snapshot(component)).toMatchSnapshot();
});

test('List can render ListItems with scroll bar', () => {
    component = mountList({
        children: getListItems(),
        maxHeight: 50,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('List can have a callback for when an item is highlighted', () => {
    const onHighlightItem = jest.fn();
    component = mountList({
        children: getListItems(),
        highlightBackgroundColor: 'blue',
        highlightColor: 'white',
        onHighlightItem,
    });
    simulateHover(component, evt);
    expect(onHighlightItem).toHaveBeenCalledTimes(1);
    expect(onHighlightItem.mock.calls[0][0].test).toBeTruthy();
    expect(onHighlightItem.mock.calls[0][1]).toEqual(2);
});

test('Up arrow key moves highlighted item up to next highlight-able item when list is active', () => {
    const onHighlightItem = jest.fn();
    component = mountList({
        active: true,
        children: getListItems().concat(getListItems()),
        highlightBackgroundColor: 'blue',
        highlightColor: 'white',
        highlightedIndex: 4,
        onHighlightItem,
    });
    simulateUpArrowKey(component);
    expect(onHighlightItem).toHaveBeenCalledTimes(1);
    expect(onHighlightItem.mock.calls[0][1]).toEqual(2);
    expect(snapshot(component)).toMatchSnapshot();
});

test('Down arrow key moves highlighted item down to next highlight-able item when list is active', () => {
    const onHighlightItem = jest.fn();
    component = mountList({
        active: true,
        children: getListItems().concat(getListItems()),
        highlightBackgroundColor: 'blue',
        highlightColor: 'white',
        highlightedIndex: 2,
        onHighlightItem,
    });
    simulateDownArrowKey(component);
    expect(onHighlightItem).toHaveBeenCalledTimes(1);
    expect(onHighlightItem.mock.calls[0][1]).toEqual(4);
    expect(snapshot(component)).toMatchSnapshot();
});

test('Enter key selects the current highlighted item when list is active', () => {
    const onSelectItem = jest.fn();
    component = mountList({
        active: true,
        children: getListItems(),
        highlightBackgroundColor: 'blue',
        highlightColor: 'white',
        highlightedIndex: 1,
        onSelectItem,
    });
    simulateEnterKey(component);
    expect(onSelectItem).toHaveBeenCalledTimes(1);
    expect(onSelectItem.mock.calls[0][1]).toEqual(1);
    expect(snapshot(component)).toMatchSnapshot();
});

test('List ignores keyUp events  when list is not active', () => {
    const onHighlightItem = jest.fn();
    component = mountList({
        children: getListItems(),
        highlightBackgroundColor: 'blue',
        highlightColor: 'white',
        highlightedIndex: 2,
        onHighlightItem,
    });
    simulateUpArrowKey(component);
    expect(onHighlightItem).not.toHaveBeenCalled();
    simulateDownArrowKey(component);
    expect(onHighlightItem).not.toHaveBeenCalled();
    simulateEnterKey(component);
    expect(onHighlightItem).not.toHaveBeenCalled();
});

test('List selects item when clicking on a ListItem', () => {
    const onSelectItem = jest.fn();
    component = mountList({
        children: getListItems(),
        highlightBackgroundColor: 'blue',
        highlightColor: 'white',
        highlightedIndex: 2,
        onSelectItem,
    });
    simulateClickItem(component, evt);
    expect(onSelectItem).toHaveBeenCalled();
    expect(onSelectItem.mock.calls[0][1]).toEqual(2);
});

test('List responds to mouseenter and mouseleave events', () => {
    const onMouseEnter = jest.fn();
    const onMouseLeave = jest.fn();
    component = renderList({
        children: getListItems(),
        highlightBackgroundColor: 'blue',
        highlightColor: 'white',
        highlightedIndex: 2,
        onMouseEnter,
        onMouseLeave
    });

    simulateMouseEnter(component, evt);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledWith(evt);

    simulateMouseLeave(component, evt);
    expect(onMouseEnter).toHaveBeenCalledTimes(1);
    expect(onMouseEnter).toHaveBeenCalledWith(evt);
});

function getListItems() {
    return [<SubHeader>Hello world</SubHeader>]
        .concat([
            'List',
            'Items'
        ]
            .map((child, index) => (
                <ListItem
                    itemOid={index}
                >
                    {child}
                </ListItem>
            )));
}
function simulateHover(wrapper, evt = {}) {
    wrapper.find('ListItem').at(1).simulate('mouseenter', evt);
}
function simulateMouseLeave(wrapper, evt = {}) {
    wrapper.find('ListItem').at(1).simulate('mouseleave', evt);
}
function simulateUpArrowKey(wrapper) {
    wrapper.find('ListItem').at(1).simulate('keyup', {keyCode: 38});
}
function simulateDownArrowKey(wrapper) {
    wrapper.find('ListItem').at(1).simulate('keyup', {keyCode: 40});
}
function simulateEnterKey(wrapper) {
    wrapper.find('ListItem').at(1).simulate('keyup', {keyCode: 13});
}
function simulateMouseEnter(wrapper, evt = {}) {
    wrapper.simulate('mouseenter', evt);
}
function simulateClickItem(wrapper, evt = {}) {
    wrapper.find('ListItem').at(1).simulate('click', evt);
}

