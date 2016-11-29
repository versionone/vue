import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import SvgIcon from './SvgIcon';

suite('SvgIcon', () => {
    test('the component will render an SVG element', () => {
        const svgComponent = mountSvgIcon();
        expect(svgComponent.root).tagName('svg');
    });

    test('the component will render the children as the SVG body', () => {
        const svgComponent = mountSvgIcon();
        expect(svgComponent.find('path')).to.exist;
        expect(svgComponent.find('path')).attr('d').to.equal('M12,4c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S16.4,4,12,4z M17,13h-4.1v3.9h-2V13H7v-2h3.9V6.9h2V11H17V13z');
    });

    test('the rendered SVG will have a the correct viewBox', () => {
        const svgComponent = mountSvgIcon();
        expect(svgComponent.root).attr('viewBox').to.equal('0 0 24 24');
    });

    test('the rendered SVG will have all appropriate properties on the SVG element', () => {
        const svgComponent = mountSvgIcon();
        expect(svgComponent.root).attr('x').to.equal('0px');
        expect(svgComponent.root).attr('y').to.equal('0px');
    });

    test('the icon is colored the proper color when not hovered', () => {
        const svgComponent = mountSvgIcon({color: '#000'});
        expect(svgComponent).style('fill').to.equal('#000');

        const svgComponentWithColor = mountSvgIcon({color: 'blue'});
        expect(svgComponentWithColor).style('fill').to.equal('blue');
    });

    test('the icon can change colors when it is hovered', () => {
        const svgComponent = mountSvgIcon({hoverColor: 'blue'});
        simulateHover(svgComponent);
        expect(svgComponent).style('fill').to.equal('blue');
        simulateHoverLeave(svgComponent);
        expect(svgComponent).style('fill').to.equal('#000');
    });

    test('standard events are exposed on the icon', () => {
        const onClick = spy();
        const onMouseEnter = spy();
        const onMouseLeave = spy();
        const svgComponent = mountSvgIcon({onClick, onMouseEnter, onMouseLeave});

        simulateClick(svgComponent);
        expect(onClick.calledOnce).to.be.true;

        simulateHover(svgComponent);
        expect(onMouseEnter.calledOnce).to.be.true;

        simulateHoverLeave(svgComponent);
        expect(onMouseLeave.calledOnce).to.be.true;
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
    wrapper.find('svg').simulate('mouseenter');
}

function simulateHoverLeave(wrapper) {
    wrapper.find('svg').simulate('mouseleave');
}

function simulateClick(wrapper) {
    wrapper.find('svg').simulate('click');
}
