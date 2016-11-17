import React from 'react';
import {mount} from 'enzyme';
import RequiredIndicator from './RequiredIndicator';

suite('RequiredIndicator', () => {
    test('the required indicator can be hidden and shown', () => {
        const hiddenComponent = mountIndicator({hidden: true}, getContext());
        expect(indicatorIsHidden(hiddenComponent)).to.be.true;

        const shownComponent = mountIndicator();
        expect(indicatorIsShown(shownComponent)).to.be.true;
    });
});

function mountIndicator(props = {}, context = getContext()) {
    return mount(<RequiredIndicator {...props} />, context);
}

function getContext() {
    return {
        context: {
            theme: {
                color: {requiredPrimary: 'black'},
                typography: {lineHeightNormal: 1.5}
            }
        }
    };
}

function indicatorIsHidden(wrapper) {
    return wrapper.find('div').props().style.opacity === 0;
}

function indicatorIsShown(wrapper) {
    return wrapper.find('div').props().style.opacity === 1;
}
