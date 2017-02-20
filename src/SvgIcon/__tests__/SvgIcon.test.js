import React from 'react';
import SvgIcon from './../SvgIcon';
import {getShallow, reset, snapshot} from './../../../specHelpers/rendering';

const shallowRenderSvgIcon = getShallow(SvgIcon);

let component;
afterEach(reset(component));

test('will render an SVG element with its children and the correct viewbox value of `0 0 24 24`', () => {
    component = shallowRenderSvgIcon({
        children: getSvgPath(),
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('SvgIcons can have a color', () => {
    component = shallowRenderSvgIcon({
        children: getSvgPath(),
        color: 'blue',
        transition: 'fill 0.5s linear 0ms',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('SvgIcons can be set to be in a hovered state', () => {
    component = shallowRenderSvgIcon({
        children: getSvgPath(),
        hoverColor: 'blue',
        hovered: true,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('SvgIcons can be hovered', () => {
    component = shallowRenderSvgIcon({
        children: getSvgPath(),
        hoverColor: 'blue',
    });
    simulateMouseEnter(component);
    expect(snapshot(component)).toMatchSnapshot();
    simulateMouseLeave(component);
    expect(snapshot(component)).toMatchSnapshot();
});

test('SvgIcons can have a width and are always rendered a squares', () => {
    const component = shallowRenderSvgIcon({
        children: getSvgPath(),
        width: 100,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('allows standard events to be handled by event handlers', () => {
    const onClick = jest.fn();
    const component = shallowRenderSvgIcon({
        children: getSvgPath(),
        onClick,
    });
    const evt = {test: true};
    simulateClick(component, evt);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(evt);
});

// --
function getSvgPath() {
    return (
        <path
            d="M12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S16.4,4,12,4z M17,13h-4.1v3.9h-2V13H7v-2h3.9V6.9h2V11H17V13z"
        />
    );
}
function simulateMouseEnter(wrapper) {
    wrapper.simulate('mouseenter');
}
function simulateMouseLeave(wrapper) {
    wrapper.simulate('mouseleave');
}
function simulateClick(wrapper, evt = {}) {
    wrapper.simulate('click', evt);
}
