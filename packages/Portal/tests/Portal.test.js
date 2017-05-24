jest.mock('react-dom');

import React from 'react';
/* eslint-disable camelcase */
import {unstable_renderSubtreeIntoContainer} from 'react-dom';
import RenderToLayer from './../src/Portal';
import {getMount, reset} from './../../../testHelpers/rendering';

jest.useFakeTimers();
const mountRenderToLayer = getMount(RenderToLayer);
let component;
afterEach(reset(component));

test('rendering to layer does not render contents of render function when open is false', () => {
    const render = jest.fn();
    render.mockReturnValue(<div>Not Rendered</div>);
    mountRenderToLayer({
        open: false,
        render,
    });
    expect(layerIsNotRendered()).toBeTruthy();
});

test('render to layer does render contents of render function when open is true', () => {
    const render = jest.fn();
    const content = <div>Rendered</div>;

    render.mockReturnValue(content);
    mountRenderToLayer({
        open: true,
        render,
    });

    expect(unstable_renderSubtreeIntoContainer.mock.calls[0][1]).toEqual(content);
});

test('unmounting RenderToLayer removes the rendered layer', () => {
    const render = jest.fn();
    render.mockReturnValue(<div>Unmount</div>);
    const renderedLayer = mountRenderToLayer({
        open: true,
        render,
    });
    renderedLayer.unmount();
    expect(layerIsNotRendered()).toBeTruthy();
});

test('clicking anywhere in the document will fire the onComponentClickAway event handler when default is not prevented', () => {
    const handleClickAway = jest.fn();
    const render = jest.fn();
    render.mockReturnValue(<div></div>);
    const mappedEventHandlers = {};
    global.window.addEventListener = jest.fn().mockImplementation((event, cb) => {
        mappedEventHandlers[event] = cb;
    });
    const evt = {
        defaultPrevented: false,
        target: window,
    };
    component = mountRenderToLayer({
        onComponentClickAway: handleClickAway,
        open: true,
        render,
    });
    jest.runAllTimers();
    simulateClickAway(mappedEventHandlers, evt);
    expect(handleClickAway).toHaveBeenCalledTimes(1);
    expect(handleClickAway).toHaveBeenCalledWith(evt);
});

test('clicking anywhere in the document will not fire the onComponentClickAway event handler when default is prevented', () => {
    const handleClickAway = jest.fn();
    const render = jest.fn();
    render.mockReturnValue(<div></div>);
    const mappedEventHandlers = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
        mappedEventHandlers[event] = cb;
    });
    const evt = {
        defaultPrevented: true,
        target: window,
    };
    component = mountRenderToLayer({
        onComponentClickAway: handleClickAway,
        open: true,
        render,
    });
    jest.runAllTimers();
    simulateClickAway(mappedEventHandlers, evt);
    expect(handleClickAway).not.toHaveBeenCalledTimes(1);
});

test('clicking within the rendered layer will not fire the onComponentClickAway event handler', () => {
    const handleClickAway = jest.fn();
    const render = jest.fn();
    const renderedLayer = (
        <ul>
            <li>Item</li>
        </ul>
    );
    render.mockReturnValue(renderedLayer);
    const mappedEventHandlers = {};
    window.addEventListener = jest.fn().mockImplementation((event, cb) => {
        mappedEventHandlers[event] = cb;
    });
    component = mountRenderToLayer({
        onComponentClickAway: handleClickAway,
        open: true,
        render,
    });
    const evt = {
        defaultPrevented: false,
        target: document.getElementsByTagName('li')[0],
    };
    jest.runAllTimers();
    simulateClickAway(mappedEventHandlers, evt);
    expect(handleClickAway).not.toHaveBeenCalled();
});


test('onRendered is invoked after rendering has completed', () => {
    const render = jest.fn();
    const handleRendered = jest.fn();
    const renderedLayer = (
        <ul>
            <li>Item</li>
        </ul>
    );
    render.mockReturnValue(renderedLayer);

    unstable_renderSubtreeIntoContainer.mockImplementation((_1, _2, _3, callback) => {
        callback();
    });

    component = mountRenderToLayer({
        onRendered: handleRendered,
        open: true,
        render,
    });

    expect(handleRendered).toHaveBeenCalledTimes(1);
});

// ---

function layerIsNotRendered() {
    return document.getElementsByTagName('div').length === 0;
}
function layerIsRendered(text) {
    return document.getElementsByTagName('div').length > 0
        && document.getElementsByTagName('div')[0].children[0].innerHTML === text;
}
function simulateClickAway(mappedEventHandlers, evt) {
    mappedEventHandlers.click(evt);
}
