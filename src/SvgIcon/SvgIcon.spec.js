import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import SvgIcon from './SvgIcon';

suite('SvgIcon', () => {
    test('will render an SVG element with its children', () => {
        const svgIcon = mountSvgIcon();
        expect(componentToHaveSvgTag(svgIcon)).to.be.true;
        expect(svgIcon.find('path')).to.exist;
        expect(svgIcon.find('path')).attr('d').to.equal('M12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S16.4,4,12,4z M17,13h-4.1v3.9h-2V13H7v-2h3.9V6.9h2V11H17V13z');
    });

    test('renders a SVG that will have the correct viewBox', () => {
        const svgIcon = mountSvgIcon();
        expect(getSvg(svgIcon)).attr('viewBox').to.equal('0 0 24 24');
    });

    test('renders a SVG that will have all appropriate properties on the SVG element', () => {
        const svgIcon = mountSvgIcon();
        expect(getSvg(svgIcon)).attr('x').to.equal('0px');
        expect(getSvg(svgIcon)).attr('y').to.equal('0px');
    });

    test('renders an icon that can configured to be a certain color', () => {
        const svgIcon = mountSvgIcon({color: 'blue'});
        expect(getSvg(svgIcon)).style('fill').to.equal('blue');
    });

    test('renders an icon that can change colors when it is hovered', () => {
        const svgIcon = mountSvgIcon({hoverColor: 'blue'});
        simulateHover(svgIcon);
        expect(getSvg(svgIcon)).style('fill').to.equal('blue');
        simulateHoverLeave(svgIcon);
        expect(getSvg(svgIcon)).style('fill').to.equal('#000');
    });

    test('renders an icon that can have a transition applied to the hover coloring', () => {
        const svgIcon = mountSvgIcon({hoverColor: 'blue'});
        expect(getSvg(svgIcon)).style('transition').to.equal('fill 0.25s linear 0ms');

        const svgIconWithCustomTransition = mountSvgIcon({
            hoverColor: 'blue',
            transition: 'fill 0.5s linear 0ms'
        });
        expect(getSvg(svgIconWithCustomTransition)).style('transition').to.equal('fill 0.5s linear 0ms');
    });

    test('renders an icon with a width that can be adjusted and is always a square', () => {
        const svgIcon = mountSvgIcon();
        expect(getSvg(svgIcon)).style('width').to.equal('24px');
        expect(getSvg(svgIcon)).style('height').to.equal('24px');

        const customWidthSvgComponent = mountSvgIcon({width: 100});
        expect(getSvg(customWidthSvgComponent)).style('width').to.equal('100px');
        expect(getSvg(customWidthSvgComponent)).style('height').to.equal('100px');
    });

    test('allows standard events to be handled by event handlers', () => {
        const onClick = spy();
        const svgIcon = mountSvgIcon({
            onClick,
        });

        simulateClick(svgIcon);
        expect(onClick.calledOnce).to.be.true;
    });
});

function mountSvgIcon(props = {}) {
    return mount(
        <SvgIcon
            {...props}
        >
            <path
                d="M12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S16.4,4,12,4z M17,13h-4.1v3.9h-2V13H7v-2h3.9V6.9h2V11H17V13z"
            />
        </SvgIcon>
    );
}

function simulateHover(wrapper) {
    wrapper.simulate('mouseenter');
}
function simulateHoverLeave(wrapper) {
    wrapper.simulate('mouseleave');
}
function simulateClick(wrapper) {
    wrapper.find('SvgIcon').simulate('click');
}
function componentToHaveSvgTag(wrapper) {
    return getSvg(wrapper).node !== undefined;
}
function getSvg(wrapper) {
    return wrapper.find('svg');
}
