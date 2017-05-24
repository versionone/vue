import React from 'react';
import componentType from '../../src/CustomPropTypes/componentType';
import {validatorFails, validatorPasses} from '../../../../testHelpers/callValidator';

test('a property of the specified component type passes', () => {
    expect(validatorPasses(componentType(TestComponent), (<div test={TestComponent} />), 'test')).toBeTruthy();
});

test('a property that is not the specified component type fails', () => {
    expect(validatorFails(componentType(TestComponent2), (<div test={TestComponent} />), 'test')).toBeTruthy();
});

test('all children must match the component type', () => {
    expect(validatorFails(componentType(TestComponent2), (
        <div>
            <TestComponent />
        </div>
    ), 'children')).toBeTruthy();

    expect(validatorFails(componentType(TestComponent2), (
        <div>
            <TestComponent2 />
            <TestComponent />
            <TestComponent2 />
        </div>
    ), 'children')).toBeTruthy();

    expect(validatorPasses(componentType(TestComponent2), (
        <div>
            <TestComponent2 />
            <TestComponent2 />
        </div>
    ), 'children')).toBeTruthy();
});

function TestComponent(props) {
    return props.children;
}

function TestComponent2(props) {
    return props.children;
}
