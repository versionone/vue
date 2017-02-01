import React from 'react';
import {mount} from 'enzyme';
import {darken, setOpacity, toRgbaString} from '@andrew-codes/color-functions';
import {spy} from 'sinon';
import Button from './Button';
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
        expect(buttonHasStyles(basicButton, color('#fff', toRgbaString(darken('#00a9e0', 0.35))))).to.be.true;
        expect(buttonHasStyles(basicButton, border(toRgbaString(darken('#00a9e0', 0.35))))).to.be.true;
    });

    test('the button can be an important type', () => {
        const importantButton = mountButton({type: ButtonTypes.important});
        expect(buttonHasStyles(importantButton, color('#fff', '#ea6c02'))).to.be.true;
        expect(buttonHasStyles(importantButton, border('#ea6c02'))).to.be.true;
        simulateHover(importantButton);
        expect(buttonHasStyles(importantButton, color('#fff', toRgbaString(darken('#ea6c02', 0.35))))).to.be.true;
        expect(buttonHasStyles(importantButton, border(toRgbaString(darken('#ea6c02', 0.35))))).to.be.true;
    });

    test('the button can be an alternative type', () => {
        const altButton = mountButton({type: ButtonTypes.alt});
        expect(buttonHasStyles(altButton, color('#fff', '#eaab00'))).to.be.true;
        expect(buttonHasStyles(altButton, border('#eaab00'))).to.be.true;
        simulateHover(altButton);
        expect(buttonHasStyles(altButton, color('#fff', toRgbaString(darken('#eaab00', 0.35))))).to.be.true;
        expect(buttonHasStyles(altButton, border(toRgbaString(darken('#eaab00', 0.35))))).to.be.true;
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

    test('the button can be disabled', () => {
        const onClick = spy();
        const disabledStandardButton = mountButton({
            disable: true,
            onClick
        });
        simulateClick(disabledStandardButton);
        expect(onClick.called).to.be.false;
        expect(buttonHasStyles(disabledStandardButton, color(toRgbaString(setOpacity('#000', 0.3)), '#fff'))).to.be.true;
        expect(buttonHasStyles(disabledStandardButton, border('rgba(0,0,0,0)'))).to.be.true;

        const disabledBasicButton = mountButton({
            disable: true,
            type: ButtonTypes.basic
        });
        expect(buttonHasStyles(disabledBasicButton, color(toRgbaString(setOpacity('#000', 0.3)), '#fff'))).to.be.true;
        expect(buttonHasStyles(disabledBasicButton, border('rgba(0,0,0,0)'))).to.be.true;

        const disabledImportantButton = mountButton({
            disable: true,
            type: ButtonTypes.important
        });
        expect(buttonHasStyles(disabledImportantButton, color(toRgbaString(setOpacity('#000', 0.3)), '#fff'))).to.be.true;
        expect(buttonHasStyles(disabledImportantButton, border('rgba(0,0,0,0)'))).to.be.true;

        const disabledAltButton = mountButton({
            disable: true,
            type: ButtonTypes.alt
        });
        expect(buttonHasStyles(disabledAltButton, color(toRgbaString(setOpacity('#000', 0.3)), '#fff'))).to.be.true;
        expect(buttonHasStyles(disabledAltButton, border('rgba(0,0,0,0)'))).to.be.true;

        const disabledBasicAltButton = mountButton({
            disable: true,
            type: ButtonTypes.basicAlt
        });
        expect(buttonHasStyles(disabledBasicAltButton, color(toRgbaString(setOpacity('#000', 0.3)), '#fff'))).to.be.true;
        expect(buttonHasStyles(disabledBasicAltButton, border('rgba(0,0,0,0)'))).to.be.true;

        const disabledSpecialButton = mountButton({
            disable: true,
            type: ButtonTypes.special
        });
        expect(buttonHasStyles(disabledSpecialButton, color(toRgbaString(setOpacity('#000', 0.3)), '#fff'))).to.be.true;
        expect(buttonHasStyles(disabledSpecialButton, border('rgba(0,0,0,0)'))).to.be.true;
    });
});

function mountButton(props = {}, context = {theme: getTheme()}) {
    return mount(<Button {...props} />, {context});
}

function getTheme() {
    return {
        _name: 'Test Theme',
        altColor: '#eaab00',
        basicColor: '#00a9e0',
        basicFontFamily: 'Arial',
        darkInverseColor: '#fff',
        importantColor: '#ea6c02',
        largeLineHeight: 2.285,
        lightInverseColor: '#000',
        normalBackground: '#fff',
        normalRadius: 3,
        smallFontSize: 14,
        textPrimaryColor: '#000'
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

function fontSize(value) {
    return style => style.fontSize === value;
}

function transition(value) {
    return style => style.transition === value;
}

function height(value) {
    return style => style.height === value;
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
