import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import TextField from './TextField';

suite('TextField', () => {
    test('the text field applies the default theme', () => {
        const textField = mountTextField();
        expect(textFieldHasBackground(textField, 'white')).to.be.true;
    });

    test('the text field can render with a default value', () => {
        const textField = mountTextField({defaultValue: 'a default value'});
        expect(textFieldHasValue(textField, 'a default value')).to.be.true;
    });

    test('the text field has an onChange event handler', () => {
        const onChange = spy();
        const textField = mountTextField({onChange});
        typeInTextField(textField, 'a');
        expect(onChange.calledOnce).to.be.true;
    });

    test('the text field is not disabled', () => {
        const textField = mountTextField({});
        expect(textFieldIsNotDisabled(textField)).to.be.true;
    });

    test('the text field can be disabled and is theme-enabled for disabled state', () => {
        const disabledTextField = mountTextField({disabled: true});
        expect(textFieldIsDisabled(disabledTextField)).to.be.true;
        expect(textFieldHasBorder(disabledTextField, 'gray')).to.be.true;
    });

    test('the text field can be marked as required or not required', () => {
        const notRequiredTextField = mountTextField();
        expect(requiredIndicatorIsHidden(notRequiredTextField)).to.be.true;

        const requiredTextField = mountTextField({required: true});
        expect(requiredIndicatorIsDisplayed(requiredTextField)).to.be.true;
    });

    test('will show the required indicator inside of the text field when set to full width', () => {
        const fullWidthTextField = mountTextField({
            fullWidth: true,
            required: true,
        });
        expect(requiredIndicatorIsInsideTextField(fullWidthTextField)).to.be.true;
    });

    test('the text field renders with the default width when no width is specified', () => {
        const textField = mountTextField();
        expect(textFieldHasWidth(textField, '256px')).to.be.true;
    });

    test('the text field can render with a specified width', () => {
        const textField = mountTextField({width: 100});
        expect(textFieldHasWidth(textField, '100px')).to.be.true;
    });

    test('the text field can render as full width', () => {
        const textFieldWithWidth = mountTextField({
            fullWidth: true,
            width: 100
        });
        expect(textFieldHasWidth(textFieldWithWidth, '100%')).to.be.true;

        const textField = mountTextField({fullWidth: true});
        expect(textFieldHasWidth(textField, '100%')).to.be.true;
    });

    test('the text field displays hint text only when there is no value or default value', () => {
        const textFieldWithoutValue = mountTextField({hintText: 'hint text'});
        expect(hintTextIsDisplayed(textFieldWithoutValue)).to.be.true;
        textFieldWithoutValue.setProps({defaultValue: 'a'});
        expect(hintTextIsHidden(textFieldWithoutValue)).to.be.true;

        const textFieldWithValue = mountTextField({
            defaultValue: 'a value',
            hintText: 'hint text'
        });
        expect(hintTextIsHidden(textFieldWithValue)).to.be.true;

        const textFieldWithDefaultValue = mountTextField({
            defaultValue: 'a default value',
            hintText: 'hint text'
        });
        expect(hintTextIsHidden(textFieldWithDefaultValue)).to.be.true;

        const textFieldWithTypedValue = mountTextField({hintText: 'hint text'});
        typeInTextField(textFieldWithTypedValue);
        expect(hintTextIsHidden(textFieldWithTypedValue)).to.be.true;

        const textFieldWithDeletedValue = mountTextField({
            defaultValue: 'a default value',
            hintText: 'hint text'
        });
        deleteAllText(textFieldWithDeletedValue);
        expect(hintTextIsDisplayed(textFieldWithDeletedValue)).to.be.true;
    });

    test('the text field renders with a height when there is no hint text or value', () => {
        const textFieldWithoutValue = mountTextField();
        expect(textFieldHasHeight(textFieldWithoutValue, '25px')).to.be.true;
    });

    test('clicking the hint text focuses the input field', () => {
        const textField = mountTextField();
        clickHintText(textField);
        expect(inputIsFocused(textField)).to.be.true;
    });

    test('the text field can have an error message and is theme-enabled for an hasError state', () => {
        const textFieldWithoutErrorText = mountTextField({});
        expect(errorTextIsHidden(textFieldWithoutErrorText)).to.be.true;

        const textFieldErrorText = mountTextField({errorText: 'error: required'});
        expect(textFieldHasErrorText(textFieldErrorText, 'error: required')).to.be.true;
        expect(textFieldHasBackground(textFieldErrorText, 'pink')).to.be.true;
        expect(textFieldHasBorder(textFieldErrorText, 'red')).to.be.true;
        expect(textFieldHasBoxShadow(textFieldErrorText, 'pink')).to.be.true;
    });

    test('the text field can be in a pending state and it is theme-enabled for a pending state', () => {
        const pendingTextField = mountTextField({pending: true});
        expect(textFieldHasBackground(pendingTextField, 'yellow')).to.be.true;
    });

    test('the text field can be focused and is theme-enabled for a focus state', () => {
        const onFocus = spy();
        const textField = mountTextField({onFocus});
        focusTextField(textField);
        expect(onFocus.calledOnce).to.be.true;
        expect(textFieldHasBoxShadow(textField, 'blue')).to.be.true;
    });

    test('the text field can lose its focused state', () => {
        const onBlur = spy();
        const textField = mountTextField({onBlur});
        focusTextField(textField);
        blurTextField(textField);
        expect(onBlur.calledOnce).to.be.true;
        expect(textFieldHasBackground(textField, 'white')).to.be.true;
    });

    test('the text field auto-expands its height to accommodate hint text that is too large for the text field', () => {
        const textField = mountTextField().setState({hintTextHeight: 51});
        expect(textFieldHasAdjustedHeightBy(textField, '34px')).to.be.true;

        const requiredTextField = mountTextField({
            errorText: 'error message',
            required: true
        }).setState({hintTextHeight: 51});
        expect(requiredIndicatorIsAlignedWithText(requiredTextField)).to.be.true;
        expect(errorTextIsAlignedWithText(requiredTextField)).to.be.true;
    });
});

function mountTextField(props = {}) {
    return mount(<TextField {...props} />, {context: {theme: getTestTheme()}});
}

function getTestTheme() {
    return {
        _name: 'Test Theme',
        basicFontFamily: '\'Proxima Nova\', \'Lucida Sans Unicode\', \'Lucida Grande\', sans-serif',
        disabledPrimaryColor: 'gray',
        errorPrimaryColor: 'red',
        errorSecondaryColor: 'pink',
        fieldBorderColor: 'mediumgray',
        focusedSecondaryColor: 'blue',
        largeFontSize: 22,
        mediumFontSize: 16,
        normalBackground: 'white',
        normalLineHeight: 1.285,
        normalRadius: 3,
        pendingPrimaryColor: 'yellow',
        smallFontSize: 14,
        textPrimaryColor: 'black',
        textSecondaryColor: 'lightgray',
        xLargeFontSize: 24,
        xMediumFontSize: 18,
        xSmallFontSize: 8,
        xxSmallGutter: 3
    };
}

function textFieldHasValue(wrapper, value) {
    return (
        wrapper.find('input').first()
            .props()
            .value === value
        || wrapper.find('input').first()
            .props()
            .defaultValue === value
    );
}

function textFieldIsNotDisabled(wrapper) {
    return (
        wrapper.find('input').first()
            .props()
            .disabled === false
        && wrapper.find('input').first()
            .props()
            .style
            .cursor === 'initial'
    );
}

function textFieldIsDisabled(wrapper) {
    return (
        wrapper.find('input').first()
            .props()
            .disabled === true
        && wrapper.find('input').first()
            .props()
            .style
            .cursor === 'not-allowed'
    );
}

function requiredIndicatorIsHidden(wrapper) {
    return !wrapper.find('RequiredIndicator').node;
}

function requiredIndicatorIsDisplayed(wrapper) {
    return !requiredIndicatorIsHidden(wrapper);
}

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

function requiredIndicatorIsInsideTextField(wrapper) {
    return (!wrapper.children('RequiredIndicator').exists()
        && wrapper.find('input')
            .parent()
            .find('RequiredIndicator')
            .exists()
    );
}

function textFieldHasWidth(wrapper, width) {
    return (
        wrapper.find('HintText')
            .parent()
            .parent()
            .props()
            .style
            .width === width
        && wrapper.find('input')
            .parent()
            .props()
            .style
            .width === width
    );
}

function hintTextIsHidden(wrapper) {
    return wrapper.find('HintText').first()
        .props()
        .hidden;
}

function hintTextIsDisplayed(wrapper) {
    return !hintTextIsHidden(wrapper);
}

function inputIsFocused(wrapper) {
    return wrapper.find('input').node === document.activeElement;
}

function clickHintText(wrapper) {
    wrapper.find('HintText').simulate('click');
}

function typeInTextField(wrapper, value = 'a') {
    const backspaceKeyCode = 8;
    const which = value === '' ? backspaceKeyCode : value.charCodeAt(0);
    wrapper.find('input').simulate('keydown', {which});
    wrapper.find('input').simulate('keyup', {which});
    wrapper.find('input').simulate('input', {target: {value}});
    wrapper.find('input').first()
        .simulate('change', {target: {value}});
}

function deleteAllText(wrapper) {
    typeInTextField(wrapper, '');
}

function focusTextField(wrapper) {
    wrapper.find('input').simulate('focus');
}

function blurTextField(wrapper) {
    wrapper.find('input').simulate('blur');
}

function errorTextIsHidden(wrapper) {
    return !wrapper.find('ErrorMessage').node;
}

function textFieldHasErrorText(wrapper, text) {
    return wrapper.find('ErrorMessage').text() === text;
}

function textFieldHasBackground(wrapper, backgroundColor) {
    return wrapper.find('HintText')
            .parent()
            .parent()
            .props()
            .style
            .background === backgroundColor;
}

function textFieldHasBoxShadow(wrapper, boxShadowColor) {
    return wrapper.find('HintText')
            .parent()
            .parent()
            .props()
            .style
            .boxShadow === `0 0 2px 2px ${boxShadowColor}`;
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

function textFieldHasBorder(wrapper, borderColor) {
    return wrapper.find('HintText')
            .parent()
            .parent()
            .props()
            .style
            .border === `1px solid ${borderColor}`;
}
