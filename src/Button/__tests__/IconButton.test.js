import IconButton from './../IconButton';
import CloseIcon from './../../Icons/CloseIcon';
import {getRender, snapshot} from './../../../specHelpers/rendering';

const renderIconButton = getRender(IconButton);

test('icon rendering', () => {
    const iconButton = renderIconButton({
        icon: CloseIcon,
    });
    expect(snapshot(iconButton)).toMatchSnapshot();
});

test('circular icon', () => {
    const iconButton = renderIconButton({
        circle: true,
        icon: CloseIcon,
    });
    expect(snapshot(iconButton)).toMatchSnapshot();
});

test('it can be resized', () => {
    const button = renderIconButton({
        icon: CloseIcon,
        size: 0.75
    });
    expect(snapshot(button)).toMatchSnapshot();
});

test('it can be clicked', () => {
    const onClick = jest.fn();
    const iconButton = renderIconButton({
        icon: CloseIcon,
        onClick,
    });
    simulateClick(iconButton);
    expect(onClick).toHaveBeenCalledTimes(1);
});

test('it can be disabled', () => {
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

function simulateClick(wrapper) {
    wrapper.simulate('click');
}
