import React from 'react';
import origin from '../../src/CustomPropTypes/origin';
import {validatorFails, validatorPasses} from '../../../../testHelpers/callValidator';

test('both vertical and horizontal origin properties are required', () => {
    expect(validatorFails(origin, <div
        prop={{}}
    />, 'prop')).toBeTruthy();
    expect(validatorFails(origin, <div
        prop={{
            horizontal: 'center',
        }}
    />, 'prop')).toBeTruthy();
    expect(validatorFails(origin, <div
        prop={{
            vertical: 'middle',
        }}
    />, 'prop')).toBeTruthy();
});
test('valid origin props pass', () => {
    expect(validatorPasses(origin, <div
        prop={{
            horizontal: 'center',
            vertical: 'middle'
        }}
    />, 'prop')).toBeTruthy();
    expect(validatorPasses(origin, <div
        prop={{
            horizontal: 'left',
            vertical: 'top'
        }}
    />, 'prop')).toBeTruthy();
    expect(validatorPasses(origin, <div
        prop={{
            horizontal: 'right',
            vertical: 'bottom'
        }}
    />, 'prop')).toBeTruthy();
});
test('invalid origin props fails', () => {
    expect(validatorFails(origin, <div
        prop={{
            horizontal: 'center of the things',
            vertical: 'middle of no where'
        }}
    />, 'prop')).toBeTruthy();
    expect(validatorFails(origin, <div
        prop={{
            horizontal: 'left',
            vertical: 1
        }}
    />, 'prop')).toBeTruthy();
});
