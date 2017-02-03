import React from 'react';
import {shallow} from 'enzyme';
import toJson from 'enzyme-to-json';
import IconButton from './../IconButton';
import CloseIcon from './../../Icons/CloseIcon';

test('icon rendering', () => {
    const iconButton = renderIconButton({});
    expect(toJson(iconButton)).toMatchSnapshot();
});

test('circular icon', () => {
    const iconButton = renderIconButton({
        circle: true,
    });
    expect(toJson(iconButton)).toMatchSnapshot();
});

test('it can be resized', () => {
    const button = renderIconButton({size: 0.75});
    expect(toJson(button)).toMatchSnapshot();
});

test('it can be clicked', () => {
    const onClick = jest.fn();
    const iconButton = renderIconButton({
        onClick,
    });
    simulateClick(iconButton);
    expect(onClick).toHaveBeenCalledTimes(1);
});

test('it can be disabled', () => {
    const onClick = jest.fn();
    const iconButton = renderIconButton({
        disabled: true,
        onClick,
    });
    simulateClick(iconButton);
    expect(onClick).toHaveBeenCalledTimes(0);
    expect(toJson(iconButton)).toMatchSnapshot();
});

function renderIconButton(props = {}, theme = {
    baseIconSize: 24,
}) {
    return shallow(<IconButton {...props} icon={CloseIcon} />, {context: {theme}});
}
function simulateClick(wrapper) {
    wrapper.simulate('click');
}
