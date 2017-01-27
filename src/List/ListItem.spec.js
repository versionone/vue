import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import ListItem from './ListItem';

suite('ListItem', () => {
    test('it can render the children', () => {
        const listItem = mountListItem();
        expect(listItemHasContent(listItem, getContent())).to.be.true;
    });
    test('it is click-able', () => {
        const handleClickSpy = spy();
        const listItem = mountListItem({
            item: getContent(),
            onClick: handleClickSpy,
        });
        simulateClick(listItem);
        expect(handleClickSpy.calledOnce).to.be.true;
        expect(handleClickSpy.calledWithExactly(getContent())).to.be.true;
    });
});

function mountListItem(props = {}) {
    return mount(<ListItem {...props}>
        {getContent()}
    </ListItem>);
}
function listItemHasContent(wrapper, text) {
    return wrapper.find('ListItem').text() === text;
}
function getContent() {
    return 'some text';
}
function simulateClick(wrapper) {
    wrapper.find('ListItem').simulate('click');
}
