import React from 'react';
import simulant from 'simulant';
import {jsdom} from 'jsdom';
import {mount} from 'enzyme';
import {spy, stub} from 'sinon';
import RenderToLayer from './RenderToLayer';

suite('RenderToLayer', () => {
    beforeEach(() => {
        global.document = jsdom('<!doctype html><html><body></body></html>');
        global.document.body.appendChild(document.createElement('section'));
        global.document.body.firstChild.innerText = 'Click me';
    });
    after(() => {
        global.document = jsdom('<!doctype html><html><body></body></html>');
        global.window = document.defaultView;
    });

    test('does not render contents of provided render function when open is false', () => {
        const render = stub().returns(<div></div>);
        mountRenderToLayer({
            open: false,
            render
        });
        expect(layerIsNotRendered()).to.be.true;
    });

    test('renders contents of provided render function when open is true', () => {
        const render = stub().returns(<div></div>);
        mountRenderToLayer({
            open: true,
            render
        });
        expect(layerIsRendered()).to.be.true;
    });

    test.skip('unmounting the component removes the rendered layer', () => {
        const render = stub().returns(<div></div>);
        const renderedLayer = mountRenderToLayer({
            open: true,
            render
        });
        renderedLayer.unmount();
        expect(layerIsNotRendered()).to.be.true;
    });

    test.skip('clicking anywhere in the document will fire the onComponentClickAway event handler', () => {
        const render = stub().returns(<div></div>);
        const handleClickAway = spy();
        mountRenderToLayer({
            open: true,
            render,
            onComponentClickAway: handleClickAway
        });
        simulateClick(document.getElementsByTagName('section')[0]);
        expect(handleClickAway.called).to.be.true;
    });
});

function mountRenderToLayer(props = {}) {
    return mount(<RenderToLayer
        {...props}
    />);
}

function layerIsNotRendered() {
    return document.getElementsByTagName('div').length === 0;
}
function layerIsRendered() {
    return document.getElementsByTagName('div').length > 0;
}
function simulateClick(el = window) {
    const evt = simulant('click');
    simulant.fire(el, evt);
}
