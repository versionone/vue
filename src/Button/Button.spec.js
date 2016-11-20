import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import Button from './Button';
import {darken} from './../utilities/colorManipulator';
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
        expect(buttonHasStyles(standardButton, color('#000', '#fff'))).to.be.true;
        expect(buttonHasStyles(standardButton, border('#000'))).to.be.true;
        simulateHover(standardButton);
        expect(buttonHasStyles(standardButton, color('#fff', '#000'))).to.be.true;
        expect(buttonHasStyles(standardButton, border('#000'))).to.be.true;
    });

    test('the button has a background color transition applied', () => {
        const standardButton = mountButton({text: 'Click me'});
        expect(buttonHasStyles(standardButton, transition('all 0.5s linear 0ms'))).to.be.true;
    });

    test('the button can be resized by a size multiplier', () => {
        const resizedBySetSizeComponent = mountButton({size: 0.75});
        expect(buttonHasStyles(resizedBySetSizeComponent, height('24px'))).to.be.true;
        expect(buttonHasStyles(resizedBySetSizeComponent, fontSize('10.5px'))).to.be.true;
    });

    test('the button can be a basic type', () => {
        const basicButton = mountButton({type: ButtonTypes.basic});
        expect(buttonHasStyles(basicButton, color('#fff', '#00a9e0'))).to.be.true;
        expect(buttonHasStyles(basicButton, border('#00a9e0'))).to.be.true;
        simulateHover(basicButton);
        expect(buttonHasStyles(basicButton, color('#fff', darken('#00a9e0', 0.35)))).to.be.true;
        expect(buttonHasStyles(basicButton, border(darken('#00a9e0', 0.35)))).to.be.true;
    });

    test('the button can be an important type', () => {
        const importantButton = mountButton({type: ButtonTypes.important});
        expect(buttonHasStyles(importantButton, color('#fff', '#ea6c02'))).to.be.true;
        expect(buttonHasStyles(importantButton, border('#ea6c02'))).to.be.true;
        simulateHover(importantButton);
        expect(buttonHasStyles(importantButton, color('#fff', darken('#ea6c02', 0.35)))).to.be.true;
        expect(buttonHasStyles(importantButton, border(darken('#ea6c02', 0.35)))).to.be.true;
    });

    test('the button can be an alternative type', () => {
        const altButton = mountButton({type: ButtonTypes.alt});
        expect(buttonHasStyles(altButton, color('#fff', '#eaab00'))).to.be.true;
        expect(buttonHasStyles(altButton, border('#eaab00'))).to.be.true;
        simulateHover(altButton);
        expect(buttonHasStyles(altButton, color('#fff', darken('#eaab00', 0.35)))).to.be.true;
        expect(buttonHasStyles(altButton, border(darken('#eaab00', 0.35)))).to.be.true;
    });

    test('the button can be an basic alternative type', () => {
        const basicAltButton = mountButton({type: ButtonTypes.basicAlt});
        expect(buttonHasStyles(basicAltButton, color('#000', '#fff'))).to.be.true;
        expect(buttonHasStyles(basicAltButton, border('#000'))).to.be.true;
        simulateHover(basicAltButton);
        expect(buttonHasStyles(basicAltButton, color('#fff', '#00a9e0', 0.35))).to.be.true;
        expect(buttonHasStyles(basicAltButton, border('#00a9e0'))).to.be.true;
    });

    test('the button can be a special type', () => {
        const specialButton = mountButton({type: ButtonTypes.special});
        expect(buttonHasStyles(specialButton, color('#fff', '#000'))).to.be.true;
        expect(buttonHasStyles(specialButton, border('#000'))).to.be.true;
        simulateHover(specialButton);
        expect(buttonHasStyles(specialButton, color('#fff', '#00a9e0', 0.35))).to.be.true;
        expect(buttonHasStyles(specialButton, border('#00a9e0'))).to.be.true;
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
            alt: '#eaab00',
            basic: '#00a9e0',
            darkInverse: '#fff',
            important: '#ea6c02',
            lightInverse: '#000',
            normalBackground: '#fff',
            textPrimary: '#000',
            transparent: 'transparent'
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

function buttonHasStyles(wrapper, matchStyles) {
    return matchStyles(wrapper.find('button')
        .props()
        .style);
}

function fontSize(fontSize) {
    return style => style.fontSize === fontSize;
}

function transition(transition) {
    return style => style.transition === transition;
}

function height(height) {
    return style => style.height === height;
}

function color(foreground, background) {
    return style => (
        style.color === foreground
        && style.background === background
    );
}

function border(borderColor) {
    return style => style.border === `1px solid ${borderColor}`;
}

function simulateClick(wrapper) {
    wrapper.simulate('click');
}
function simulateHover(wrapper) {
    wrapper.simulate('mouseenter');
}