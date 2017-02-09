import ErrorMessage from './../ErrorMessage';
import {getShallow, snapshot} from './../../../specHelpers/rendering';

const shallowRenderErrorMessage = getShallow(ErrorMessage);
const evt = {test: true};

test('error message can render defaults properly', () => {
    const component = shallowRenderErrorMessage({
        text: 'required field',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('error message animates being hidden', () => {
    const component = shallowRenderErrorMessage({
        hidden: true,
        text: 'required field',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('error message is click-able', () => {
    const onClick = jest.fn();
    const component = shallowRenderErrorMessage({
        onClick,
    });
    simulateClick(component, evt);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(evt);
});

function simulateClick(wrapper, evt = {}) {
    wrapper.simulate('click', evt);
}
