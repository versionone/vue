import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import Button from './Button';
import {create} from './../Styles/Transitions';
import * as ButtonTypes from './Types';

suite('Button', () => {
    test('it can have text', () => {
        const standardButton = mountButton({text: 'Click me'});
        expect(buttonHasText(standardButton, 'Click me')).to.be.true;
    });

    test('it can have onClick event handlers', () => {
        const onClick = spy();
        const standardButton = mountButton({onClick});
        simulateClick(standardButton);
        expect(onClick.calledOnce).to.be.true;
    });

    test('a standard button is the default type of button', () => {
        const standardButton = mountButton({text: 'Click me'});
        expect(buttonIsStandardButton(standardButton)).to.be.true;
    });

    test('the button has a background color transition applied', () => {
        const standardButton = mountButton({text: 'Click me'});
        expect(buttonHasBackgroundTransitionApplied(standardButton, create('0.5s'))).to.be.true;
    });

    test('the button can be resized by a size multiplier', () => {
        const resizedBySetSizeComponent = mountButton({size: 0.75});
        expect(buttonHasHeight(resizedBySetSizeComponent, '24px')).to.be.true;
        expect(buttonHasFontSize(resizedBySetSizeComponent, '10.5px')).to.be.true;
    });

    test('the button can be a basic type', () => {
        const basicButton = mountButton({type: ButtonTypes.basic});
        expect(buttonIsBasicButton(basicButton)).to.be.true;
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
            basic: '#00a9e0',
            normalBackground: 'white',
            normalBackgroundInverse: 'black',
            textPrimary: 'black',
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
        normalRootStyles.color === 'black'
        && normalRootStyles.border === '1px solid black'
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

function buttonIsBasicButton(wrapper) {
    const normalRootStyles = wrapper.find('button')
        .props()
        .style;
    const normalStateIsCorrect = (
        normalRootStyles.color === 'white'
        && normalRootStyles.border === '1px solid #00a9e0'
        && normalRootStyles.background === '#00a9e0'
    );

    simulateHover(wrapper);
    const hoveredRootStyles = wrapper.find('button')
        .props()
        .style;
    const hoverStateIsCorrect = (
        hoveredRootStyles.color === 'white'
        && hoveredRootStyles.background === 'rgb(0,110,146)'
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
