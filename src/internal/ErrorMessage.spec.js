import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import ErrorMessage from './ErrorMessage';

suite('ErrorMessage', () => {
    test('the error message animates toggling show and hide of error text', () => {
        const actual = mountErrorMessage({text: 'required field'});
        expect(isAnimated(actual)).to.be.true;
        expect(actual.text()).to.equal('required field');
        expect(isVisible(actual)).to.be.true;

        const hiddenErrorMessage = mountErrorMessage({
            hidden: true,
            text: 'required field'
        });
        expect(hiddenErrorMessage.text()).to.equal('required field');
        expect(isHidden(hiddenErrorMessage)).to.be.true;
    });

    test('the error message accepts standard event handlers', () => {
        const onBlur = spy();
        const onClick = spy();
        const actual = mountErrorMessage({
            onBlur,
            onClick
        });
        simulateBlur(actual);
        expect(onBlur.calledOnce).to.be.true;

        simulateClick(actual);
        expect(onClick.calledOnce).to.be.true;
    });
});

function mountErrorMessage(props = {}, context = getContext()) {
    return mount(<ErrorMessage {...props} />, context);
}

function getContext() {
    return {
        context: {
            theme: {
                basicFontFamily: 'Arial',
                errorPrimaryColor: 'red'
            }
        }
    };
}

function isAnimated(wrapper) {
    return wrapper.find('span').props().style.transition === 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
}

function isVisible(wrapper) {
    return wrapper.find('span').props().style.opacity === 1;
}

function isHidden(wrapper) {
    return wrapper.find('span').props().style.opacity === 0;
}

function simulateBlur(wrapper) {
    wrapper.simulate('blur');
}
function simulateClick(wrapper) {
    wrapper.simulate('click');
}
