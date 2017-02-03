import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import Button from '../Button';
import * as ButtonTypes from '../Types';

test('it is click-able with an event handler', () => {
    const onClick = jest.fn();
    const button = renderButton({
        onClick,
    });
    simulateClick(button);
    expect(onClick).toBeCalled();
});

test('standard button', () => {
    const buttonWithDefaultType = renderButton({
        text: 'Click me',
    });
    expect(toJson(buttonWithDefaultType)).toMatchSnapshot();

    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.standard,
    });
    expect(toJson(button)).toMatchSnapshot();
});

test('basic button', () => {
    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.basic
    });
    expect(toJson(button)).toMatchSnapshot();
});

test('important button', () => {
    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.important,
    });
    expect(toJson(button)).toMatchSnapshot();
});

test('alternative button', () => {
    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.alt,
    });
    expect(toJson(button)).toMatchSnapshot();
});

test('basic alternative button', () => {
    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.basicAlt,
    });
    expect(toJson(button)).toMatchSnapshot();
});

test('special button', () => {
    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.special,
    });
    expect(toJson(button)).toMatchSnapshot();
});

test('it can be resized', () => {
    const button = renderButton({size: 0.75});
    expect(toJson(button)).toMatchSnapshot();
});

test('button can be disabled', () => {
    let onClick = jest.fn();
    const button = renderButton({
        disabled: true,
        onClick
    });
    simulateClick(button);
    expect(onClick).not.toBeCalled();
    expect(toJson(button)).toMatchSnapshot();
});

function renderButton(props = {}, context = {theme: getTheme()}) {
    return shallow(<Button {...props} />, {context});
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
        textPrimaryColor: '#000',
    };
}
function simulateClick(wrapper) {
    wrapper.simulate('click');
}
