import React from 'react';
import RenderToLayer from '../RenderToLayer';
import {getMount} from './../../../specHelpers/rendering';

const mountRenderToLayer = getMount(RenderToLayer);

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
    render.mockReturnValue(<div>Rendered</div>);
    mountRenderToLayer({
        open: true,
        render,
    });
    expect(layerIsRendered('Rendered')).toBeTruthy();
});

test.skip('unmounting RenderToLayer removes the rendered layer', () => {
    const render = jest.fn();
    render.mockReturnValue(<div>Unmount</div>);
    const renderedLayer = mountRenderToLayer({
        open: true,
        render,
    });
    renderedLayer.unmount();
    expect(layerIsNotRendered()).toBeTruthy();
});

test.skip('clicking anywhere in the document will fire the onComponentClickAway event handler', () => {
    const render = jest.fn();
    render.mockReturnValue(<div>click away</div>);
    const handleClickAway = jest.fn();
    mountRenderToLayer({
        onComponentClickAway: handleClickAway,
        open: true,
        render,
    });
    // simulateClick();
    expect(handleClickAway).toHaveBeenCalledTimes(1);
});

function layerIsNotRendered() {
    return document.getElementsByTagName('div').length === 0;
}
function layerIsRendered(text) {
    console.log(document.body.children[0].children.length)
    return document.getElementsByTagName('div').length > 0
        && document.getElementsByTagName('div')[0].children[0].innerHTML === text;
}
