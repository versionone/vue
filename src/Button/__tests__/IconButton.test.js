import IconButton from './../IconButton';
import CloseIcon from './../../Icons/CloseIcon';
import {getMount, getShallow, reset, snapshot} from './../../../specHelpers/rendering';

const shallowRenderIconButton = getShallow(IconButton);
const mountIconButton = getMount(IconButton);
const clickEvent = {test: true};

let component;
afterEach(reset(component));

test('icon button renders with defaults', () => {
    component = mountIconButton({
        icon: CloseIcon,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('circular icon button', () => {
    component = mountIconButton({
        circle: true,
        icon: CloseIcon,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('icon button can be resized', () => {
    component = mountIconButton({
        icon: CloseIcon,
        size: 0.75
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('icon button is click-able', () => {
    const onClick = jest.fn();
    component = shallowRenderIconButton({
        icon: CloseIcon,
        onClick,
    });
    simulateClick(component, clickEvent);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(clickEvent);
});

test('icon button can be disabled', () => {
    const onClick = jest.fn();
    component = mountIconButton({
        disabled: true,
        icon: CloseIcon,
        onClick,
    });
    simulateClick(component);
    expect(onClick).toHaveBeenCalledTimes(0);
    expect(snapshot(component)).toMatchSnapshot();
});

test('icon button can have a border', () => {
    component = mountIconButton({
        border: '1px solid blue',
        icon: CloseIcon,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('icon button can be set to be hovered', () => {
    component = mountIconButton({
        border: '1px solid blue',
        hoverBackgroundColor: '#fff',
        hoverColor: '#3b8',
        hovered: true,
        icon: CloseIcon,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

function simulateClick(wrapper, evt = {}) {
    wrapper.simulate('click', evt);
}
