import React from 'react';
import {mount} from 'enzyme';
import {spy} from 'sinon';
import HintText from './HintText';

suite('HintText', () => {
    test('the hint text can display text content', () => {
        const actual = mountHintText({text: 'hint text'});
        expect(hasTextContent(actual, 'hint text')).to.be.true;
    });

    test('the hint text is animated when hiding and showing', () => {
        const actual = mountHintText();
        expect(hasTransitionApplied(actual)).to.be.true;
    });

    test('the hint text can be shown or hidden', () => {
        const visibleHintText = mountHintText();
        expect(isVisible(visibleHintText)).to.be.true;

        const hiddenHintText = mountHintText({hidden: true});
        expect(isHidden(hiddenHintText)).to.be.true;
    });

    test('the hint text can accept onClick and other standard event handlers', () => {
        const onClick = spy();
        const onBlur = spy();
        const actual = mountHintText({
            onBlur,
            onClick
        });
        simulateClick(actual);
        expect(onClick.calledOnce).to.be.true;

        simulateBlur(actual);
        expect(onBlur.calledOnce).to.be.true;
    });
});

function mountHintText(props = {}, context = getContext()) {
    return mount(<HintText {...props} />, context);
}

function getContext() {
    return {
        context: {
            theme: {
                color: {textSecondary: 'gray'},
                typography: {
                    basicFamily: 'Arial',
                    lineHeightNormal: 1.5,
                    small: 14
                }
            }
        }
    };
}

function hasTextContent(wrapper, textContent) {
    return wrapper.find('span').text() === textContent;
}

function hasTransitionApplied(wrapper) {
    return wrapper.find('span').props().style.transition === 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms';
}

function isVisible(wrapper) {
    return wrapper.find('span').props().style.opacity === 1;
}

function isHidden(wrapper) {
    return wrapper.find('span').props().style.opacity === 0;
}

function simulateClick(wrapper) {
    wrapper.simulate('click');
}

function simulateBlur(wrapper) {
    wrapper.simulate('blur');
}
