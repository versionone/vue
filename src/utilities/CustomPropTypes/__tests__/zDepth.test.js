import React from 'react';
import zDepth from '../zDepth';
import {validatorFails, validatorPasses} from './../../../../specHelpers/callValidator';

test('zDepth is a whole number between 0 and 5', () => {
    expect(validatorPasses(zDepth, <div prop={0} />, 'prop')).toBeTruthy();
    expect(validatorPasses(zDepth, <div prop={1} />, 'prop')).toBeTruthy();
    expect(validatorPasses(zDepth, <div prop={2} />, 'prop')).toBeTruthy();
    expect(validatorPasses(zDepth, <div prop={3} />, 'prop')).toBeTruthy();
    expect(validatorPasses(zDepth, <div prop={4} />, 'prop')).toBeTruthy();
    expect(validatorPasses(zDepth, <div prop={5} />, 'prop')).toBeTruthy();
    expect(validatorFails(zDepth, <div prop={15} />, 'prop')).toBeTruthy();
    expect(validatorFails(zDepth, <div prop={-1} />, 'prop')).toBeTruthy();
    expect(validatorFails(zDepth, <div prop={1.5} />, 'prop')).toBeTruthy();
});
