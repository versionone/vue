import HintText from '../HintText';
import {getShallow, snapshot} from './../../../testHelpers/rendering';

const shallowRenderHintText = getShallow(HintText);
const evt = {
    test: true,
};

test('hint text can display text content', () => {
    const component = shallowRenderHintText({
        text: 'hint text',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('hint text can be hidden', () => {
    const component = shallowRenderHintText({
        hidden: true,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('hint text is click-able', () => {
    const onClick = jest.fn();
    const component = shallowRenderHintText({
        onClick,
    });
    simulateClick(component, evt);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(evt);
});

function simulateClick(wrapper, e = {}) {
    wrapper.simulate('click', e);
}
