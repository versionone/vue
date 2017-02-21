import Button from '../Button';
import {getShallow, snapshot} from './../../../specHelpers/rendering';
import * as ButtonTypes from '../Types';

const shallowRenderButton = getShallow(Button);
const clickEvent = {
    test: true,
};

test('button is click-able with an event handler', () => {
    const onClick = jest.fn();
    const button = shallowRenderButton({
        onClick,
    });
    simulateClick(button, clickEvent);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(clickEvent);
});

test('standard button', () => {
    const buttonWithDefaultType = shallowRenderButton({
        text: 'Click me',
    });
    expect(snapshot(buttonWithDefaultType)).toMatchSnapshot();

    const button = shallowRenderButton({
        text: 'Click me',
        type: ButtonTypes.standard,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('basic button', () => {
    const button = shallowRenderButton({
        text: 'Click me',
        type: ButtonTypes.basic,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('important button', () => {
    const button = shallowRenderButton({
        text: 'Click me',
        type: ButtonTypes.important,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('alternative button', () => {
    const button = shallowRenderButton({
        text: 'Click me',
        type: ButtonTypes.alt,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('basic alternative button', () => {
    const button = shallowRenderButton({
        text: 'Click me',
        type: ButtonTypes.basicAlt,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('special button', () => {
    const button = shallowRenderButton({
        text: 'Click me',
        type: ButtonTypes.special,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('button can be resized', () => {
    const button = shallowRenderButton({
        size: 0.75,
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('button can be disabled', () => {
    const onClick = jest.fn();
    const button = shallowRenderButton({
        disable: true,
        onClick,
    });
    simulateClick(button);
    expect(onClick).not.toBeCalled();
    expect(snapshot(button)).toMatchSnapshot();
});

function simulateClick(wrapper, evt = {}) {
    wrapper.simulate('click', evt);
}
