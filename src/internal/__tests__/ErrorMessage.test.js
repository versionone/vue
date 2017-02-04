import ErrorMessage from './../ErrorMessage';
import {getRender, snapshot} from './../../../specHelpers/rendering';

const renderErrorMessage = getRender(ErrorMessage);
const evt = {test: true};

test('error message can render defaults properly', () => {
    const component = renderErrorMessage({
        text: 'required field',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('error message animates being hidden', () => {
    const component = renderErrorMessage({
        hidden: true,
        text: 'required field',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('error message is click-able', () => {
    const onClick = jest.fn();
    const component = renderErrorMessage({
        onClick,
    });
    simulateClick(component, evt);
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith(evt);
});

function simulateClick(wrapper, evt = {}) {
    wrapper.simulate('click', evt);
}
