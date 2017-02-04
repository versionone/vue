import IconButton from './../IconButton';
import CloseIcon from './../../Icons/CloseIcon';
import {getRender, snapshot} from './../../../specHelpers/rendering';

const renderIconButton = getRender(IconButton);
const clickEvent = {test: true};

test('icon button renders with defaults', () => {
    const iconButton = renderIconButton({
        icon: CloseIcon,
    });
    expect(snapshot(iconButton)).toMatchSnapshot();
});

test('circular icon button', () => {
    const iconButton = renderIconButton({
        circle: true,
        icon: CloseIcon,
    });
    expect(snapshot(iconButton)).toMatchSnapshot();
});

test('icon button can be resized', () => {
    const button = renderIconButton({
        icon: CloseIcon,
        size: 0.75
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('icon button is click-able', () => {
    const onClick = jest.fn();
    const iconButton = renderIconButton({
        icon: CloseIcon,
        onClick,
    });
    simulateClick(iconButton, clickEvent);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(clickEvent);
});

test('icon button can be disabled', () => {
    const onClick = jest.fn();
    const iconButton = renderIconButton({
        disabled: true,
        icon: CloseIcon,
        onClick,
    });
    simulateClick(iconButton);
    expect(onClick).toHaveBeenCalledTimes(0);
    expect(snapshot(iconButton)).toMatchSnapshot();
});

test('icon button can have a border', () => {
    const iconButton = renderIconButton({
        border: '1px solid blue',
        icon: CloseIcon,
    });
    expect(snapshot(iconButton)).toMatchSnapshot();
});

function simulateClick(wrapper, evt = {}) {
    wrapper.simulate('click', evt);
}
