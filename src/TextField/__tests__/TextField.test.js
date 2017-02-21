import TextField from '../TextField';
import {getMount, getShallow, reset, snapshot} from './../../../specHelpers/rendering';

const mountTextField = getMount(TextField);
const shallowRenderTextField = getShallow(TextField);

let component;
const evt = {
    target: {
        value: 'a'
    },
    test: true,
};
afterEach(reset(component));

test('TextFields can render with a default value', () => {
    component = shallowRenderTextField({
        defaultValue: 'a default value',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields can render with an explicit value', () => {
    component = shallowRenderTextField({
        value: 'a default value',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields respond to onChange events', () => {
    const onChange = jest.fn();
    component = shallowRenderTextField({
        onChange,
    });
    typeInTextField(component, evt);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(evt, 'a');
});

test('TextField can be disabled', () => {
    component = shallowRenderTextField({
        disabled: true,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields can be marked as required', () => {
    component = shallowRenderTextField({
        required: true,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields will show the required indicator inside of the textbox when set to full width', () => {
    component = shallowRenderTextField({
        fullWidth: true,
        required: true,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields will renders with a default width when no width is specified', () => {
    component = shallowRenderTextField();
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields can have a specified width', () => {
    component = shallowRenderTextField({
        width: 100,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields can render as full width; ignoring any width prop value', () => {
    component = shallowRenderTextField({
        fullWidth: true,
        width: 100,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields only display hint text when there is no value or default value', () => {
    component = shallowRenderTextField({
        hintText: 'hint text',
    });
    expect(snapshot(component)).toMatchSnapshot();
    component.setProps({
        value: 'a value'
    });
    expect(snapshot(component)).toMatchSnapshot();

    component = shallowRenderTextField({
        defaultValue: 'a default value',
        hintText: 'hint text',
    });
    expect(snapshot(component)).toMatchSnapshot();

    component = shallowRenderTextField({
        hintText: 'hint text',
        value: 'a value'
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextField renders with a height when there is no hint text, default value, or value', () => {
    component = shallowRenderTextField();
    expect(snapshot(component)).toMatchSnapshot();
});

test('Clicking the hint text focuses the textbox', () => {
    component = mountTextField({
        hintText: 'hint text',
    });
    clickHintText(component);
    expect(inputIsFocused(component)).toBeTruthy();
});

test('TextFields can have an error message and styled as having an error', () => {
    component = shallowRenderTextField({
        errorText: 'error: required',
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields can be styled as pending', () => {
    component = shallowRenderTextField({
        pending: true,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields respond to focus events and styled as focused', () => {
    const onFocus = jest.fn();
    component = shallowRenderTextField({
        onFocus,
    });
    focusTextField(component, evt);
    expect(onFocus).toHaveBeenCalledTimes(1);
    expect(onFocus).toHaveBeenCalledWith(evt);
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields respond to blur events and lose their focused styling when blurred', () => {
    const onBlur = jest.fn();
    component = shallowRenderTextField({
        onBlur,
    });
    focusTextField(component);
    blurTextField(component, evt);
    expect(onBlur).toHaveBeenCalledTimes(1);
    expect(onBlur).toHaveBeenCalledWith(evt);
    expect(snapshot(component)).toMatchSnapshot();
});

test('TextFields auto-expands its height to accommodate hint text that is too large for the text field', () => {
    component = shallowRenderTextField()
        .setState({
            hintTextHeight: 51,
        });
    expect(snapshot(component)).toMatchSnapshot();

    component = shallowRenderTextField({
        errorText: 'error message',
        required: true
    })
        .setState({
            hintTextHeight: 51,
        });
    expect(snapshot(component)).toMatchSnapshot();

    component = mountTextField({
        hintText: 'hint text'
    })
        .setState({
            hintTextHeight: 50,
        });
    component.setProps({
        hintText: 'something else',
    });

    expect(snapshot(component)).toMatchSnapshot();
});

// ---

function requiredIndicatorIsAlignedWithText(wrapper) {
    return wrapper.find('RequiredIndicator').parent()
            .first()
            .props()
            .style
            .margin === '34px 0 0 6px';
}
function errorTextIsAlignedWithText(wrapper) {
    return wrapper.find('ErrorMessage').parent()
            .props()
            .style
            .margin === '0 0 0 6px';
}
function inputIsFocused(wrapper) {
    return wrapper.find('input').node === document.activeElement;
}
function clickHintText(wrapper) {
    wrapper.find('HintText').simulate('click');
}
function typeInTextField(wrapper, e = {}) {
    wrapper.find('input')
        .simulate('keydown', e);
    wrapper.find('input')
        .simulate('keyup', e);
    wrapper.find('input')
        .simulate('input', e);
    wrapper.find('input')
        .simulate('change', e);
}
function focusTextField(wrapper, e = {}) {
    wrapper.find('input').simulate('focus', e);
}
function blurTextField(wrapper, e = {}) {
    wrapper.find('input').simulate('blur', e);
}
function textFieldHasAdjustedHeightBy(wrapper, adjustment) {
    return wrapper.find('input')
            .parent()
            .props()
            .style
            .marginTop === adjustment;
}
function textFieldHasHeight(wrapper, height) {
    return wrapper.find('HintText')
            .parent()
            .parent()
            .props()
            .style
            .height === height;
}
