import React from 'react';
import oneOfComponentType from '../../src/CustomPropTypes/oneOfComponentType';
import {validatorFails, validatorPasses} from './../../../../testHelpers/callValidator';

test('a property must be one of the specified component types', () => {
    expect(validatorPasses(oneOfComponentType([
        TestComponent,
        TestComponent2,
    ]), <div prop={TestComponent2} />, 'prop')).toBeTruthy();

    expect(validatorFails(oneOfComponentType([
        TestComponent,
    ]), <div prop={TestComponent2} />, 'prop')).toBeTruthy();
});

test('all children must be one of the specified component types', () => {
    expect(validatorPasses(oneOfComponentType([
        TestComponent,
        TestComponent2,
    ]), (
        <div>
            <TestComponent2 />
        </div>
    ), 'children')).toBeTruthy();

    expect(validatorPasses(oneOfComponentType([
        TestComponent,
        TestComponent2,
    ]), (
        <div>
            <TestComponent2 />
            <TestComponent />
        </div>
    ), 'children')).toBeTruthy();

    expect(validatorFails(oneOfComponentType([
        TestComponent,
        TestComponent2,
    ]), (
        <div>
            <TestComponent2 />
            <div />
        </div>
    ), 'children')).toBeTruthy();
});

const TestComponent = (props) => props.children;

const TestComponent2 = (props) => props.children;
