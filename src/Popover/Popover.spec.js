import React, {Component} from 'react';
import {mount} from 'enzyme';
import {jsdom} from 'jsdom';
import Popover from './Popover';

suite('Popover', () => {
    beforeEach(() => {
        global.document = jsdom('<!doctype html><html><body></body></html>');
        global.document.body.appendChild(document.createElement('section'));
        global.document.body.firstChild.innerText = 'Click me';
    });
    after(() => {
        global.document = jsdom('<!doctype html><html><body></body></html>');
        global.window = document.defaultView;
    });

    test('closed or unspecified open state are not visible', () => {
        mountPopover({open: false});
        expect(popoverIsNotVisible()).to.be.true;

        mountPopover();
        expect(popoverIsNotVisible()).to.be.true;
    });

    test('open popovers are visible', () => {
        mountPopover({open: true});
        expect(popoverIsVisible()).to.be.true;
    });

    test('a popover can be opened', () => {
        const popover = mountPopover({open: false});
        popover.setProps({open: true});
        expect(popoverIsVisible()).to.be.true;
    });

    test('open popover can be closed', () => {
        const popover = mountPopover({open: true});
        popover.setProps({open: true});
        popover.setProps({open: false});
        expect(popoverIsNotVisible()).to.be.true;
    });

    test('it can contain content', () => {
        mountPopover({open: true});
        expect(popoverToContainContent()).to.be.true;
    });
});

function mountPopover(props = {}, context = {theme: getTheme()}) {
    return mount((
        <Popover {...props} anchorElement={document.body.firstChild}>
            Hello World
        </Popover>
    ), context);
}

function getTheme() {
    return {};
}
function getRootElementOfPopover() {
    return document.body.getElementsByTagName('div')[1];
}
function popoverIsNotVisible() {
    return getRootElementOfPopover() === undefined;
}
function popoverIsVisible() {
    return getRootElementOfPopover() !== undefined;
}
function popoverToContainContent() {
    return getRootElementOfPopover().innerHTML === 'Hello World';
}