import IconButton from './../IconButton';
import CloseIcon from './../../Icons/CloseIcon';
import {getShallow, snapshot} from './../../../specHelpers/rendering';

const shallowRenderIconButton = getShallow(IconButton);
const clickEvent = {test: true};

test('icon button renders with defaults', () => {
    const iconButton = shallowRenderIconButton({
        icon: CloseIcon,
    });
    expect(snapshot(iconButton)).toMatchSnapshot();
});

test('circular icon button', () => {
    const iconButton = shallowRenderIconButton({
        circle: true,
        icon: CloseIcon,
    });
    expect(snapshot(iconButton)).toMatchSnapshot();
});

test('icon button can be resized', () => {
    const button = shallowRenderIconButton({
        icon: CloseIcon,
        size: 0.75
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('icon button is click-able', () => {
    const onClick = jest.fn();
    const iconButton = shallowRenderIconButton({
        icon: CloseIcon,
        onClick,
    });
    simulateClick(iconButton, clickEvent);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(clickEvent);
});

test('icon button can be disabled', () => {
    const onClick = jest.fn();
    const iconButton = shallowRenderIconButton({
        disabled: true,
        icon: CloseIcon,
        onClick,
    });
    simulateClick(iconButton);
    expect(onClick).toHaveBeenCalledTimes(0);
    expect(snapshot(iconButton)).toMatchSnapshot();
});

test('icon button can have a border', () => {
    const iconButton = shallowRenderIconButton({
        border: '1px solid blue',
        icon: CloseIcon,
    });
    expect(snapshot(iconButton)).toMatchSnapshot();
});

function simulateClick(wrapper, evt = {}) {
    wrapper.simulate('click', evt);
}
