import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import Button from './Button';
import {create} from './../Styles/Transitions';

suite('Button', () => {
    test('it can have text', () => {
        const mountedComponent = mountButton({text: 'Click me'});
        expect(buttonHasText(mountedComponent, 'Click me')).to.be.true;
    });

    test('it can have onClick event handlers', () => {
        const onClick = spy();
        const mountedComponent = mountButton({onClick});
        simulateClick(mountedComponent);
        expect(onClick.calledOnce).to.be.true;
    });

    test('a standard button is the default type of button', () => {
        const mountedComponent = mountButton({text: 'Click me'});
        expect(buttonIsStandardButton(mountedComponent)).to.be.true;
    });

    test('the button has a background color transition applied', () => {
        const mountedComponent = mountButton({text: 'Click me'});
        expect(buttonHasBackgroundTransitionApplied(mountedComponent, create('0.5s'))).to.be.true;
    });

    test('the button can be resized by a size multiplier', () =>{
        const resizedBySetSizeComponent = mountButton({size: 0.75});
        expect(buttonHasHeight(resizedBySetSizeComponent, '24px')).to.be.true;
        expect(buttonHasFontSize(resizedBySetSizeComponent, '10.5px')).to.be.true;
    });
});

function mountButton(props = {}, context = {theme: getTheme()}) {
    return mount(<Button {...props} />, {context});
}

function getTheme() {
    return {
        border: {
            normalRadius: 3
        },
        color: {
            normalBackground: 'white',
            normalBackgroundInverse: 'black',
            textPrimary: 'green',
            textPrimaryInverse: 'white'
        },
        typography: {
            basicFontFamily: 'Arial',
            lineHeightLarge: 2.285,
            small: 14
        }
    };
}

function buttonHasText(wrapper, text) {
    return wrapper.text() === text;
}

function buttonHasFontSize(wrapper, fontSize) {
    return wrapper
        .find('button')
        .props()
        .style
        .fontSize === fontSize;
}

function buttonIsStandardButton(wrapper) {
    const normalRootStyles = wrapper.find('button')
        .props()
        .style;
    const normalStateIsCorrect = (
        normalRootStyles.color === 'green'
        && normalRootStyles.border === '1px solid green'
        && normalRootStyles.background === 'white'
        && normalRootStyles.borderRadius === '6px'
        && buttonHasHeight(wrapper, '32px')
    );

    simulateHover(wrapper);
    const hoveredRootStyles = wrapper.find('button')
        .props()
        .style;
    const hoverStateIsCorrect = (
        hoveredRootStyles.color === 'white'
        && hoveredRootStyles.background === 'black'
    );

    return normalStateIsCorrect && hoverStateIsCorrect;
}

function buttonHasBackgroundTransitionApplied(wrapper, transition) {
    return wrapper.find('button')
            .props()
            .style
            .transition === transition;
}

function buttonHasHeight(wrapper, height) {
    return wrapper.find('button')
            .props()
            .style
            .height === height;
}

function simulateClick(wrapper) {
    wrapper.simulate('click');
}

function simulateHover(wrapper) {
    wrapper.simulate('mouseenter');
}
