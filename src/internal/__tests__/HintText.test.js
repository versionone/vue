import HintText from '../HintText';
import {getRender, snapshot} from './../../../specHelpers/rendering';

const renderHintText = getRender(HintText);
const evt = {test: true};

test('hint text can display text content', () => {
    const component = renderHintText({
        text: 'hint text',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('hint text can be hidden', () => {
    const component = renderHintText({
        hidden: true,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('hint text is click-able', () => {
    const onClick = jest.fn();
    const component = renderHintText({
        onClick,
    });
    simulateClick(component, evt);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(evt);
});

function simulateClick(wrapper, evt = {}) {
    wrapper.simulate('click', evt);
}
