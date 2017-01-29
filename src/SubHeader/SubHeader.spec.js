import React from 'react';
import { mount } from 'enzyme';
import SubHeader from './SubHeader';

suite('SubHeader', () => {
    test('it renders text as a sub header', () => {
        const subHeader = mountSubHeader(getTextContent());
        expect(subHeaderHasTextContent(subHeader, getTextContent())).to.be.true;
    });
});

function mountSubHeader(text, props = {}) {
    return mount(<SubHeader {...props}>{text}</SubHeader>, { context: { theme: getTestTheme() } });
}
function getTextContent() {
    return 'Hello world.';
}
function subHeaderHasTextContent(wrapper, text) {
    return wrapper.text() === text;
}
function getTestTheme() {
    return { _name: 'Test Theme', };
}
