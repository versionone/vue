import Button from '../Button';
import {getRender, snapshot} from './../../../specHelpers/rendering';
import * as ButtonTypes from '../Types';

const renderButton = getRender(Button);
const clickEvent = {test: true};

test('button is click-able with an event handler', () => {
    const onClick = jest.fn();
    const button = renderButton({
        onClick,
    });
    simulateClick(button, clickEvent);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(clickEvent);
});

test('standard button', () => {
    const buttonWithDefaultType = renderButton({
        text: 'Click me',
    });
    expect(snapshot(buttonWithDefaultType)).toMatchSnapshot();

    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.standard,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('basic button', () => {
    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.basic
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('important button', () => {
    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.important,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('alternative button', () => {
    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.alt,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('basic alternative button', () => {
    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.basicAlt,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('special button', () => {
    const button = renderButton({
        text: 'Click me',
        type: ButtonTypes.special,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('button can be resized', () => {
    const button = renderButton({size: 0.75});
    expect(snapshot(button)).toMatchSnapshot();
});

test('button can be disabled', () => {
    let onClick = jest.fn();
    const button = renderButton({
        disabled: true,
        onClick
    });
    simulateClick(button);
    expect(onClick).not.toBeCalled();
    expect(snapshot(button)).toMatchSnapshot();
});

function simulateClick(wrapper, evt = {}) {
    wrapper.simulate('click', evt);
}
