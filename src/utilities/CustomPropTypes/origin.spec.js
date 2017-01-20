import React from 'react';
import origin from './origin';
import {validatorFails, validatorPasses} from './../../../specHelpers/callValidator';

suite('origin PropType', () => {
    test('both vertical and horizontal origin properties are required', () => {
        expect(validatorFails(origin, <div prop={{}} />, 'prop')).to.be.true;
        expect(validatorFails(origin, <div prop={{horizontal: 'center'}} />, 'prop')).to.be.true;
        expect(validatorFails(origin, <div prop={{vertical: 'middle'}} />, 'prop')).to.be.true;
    });
    test('valid origin props pass', () => {
        expect(validatorPasses(origin, <div prop={{horizontal: 'center', vertical: 'middle'}} />, 'prop')).to.be.true;
        expect(validatorPasses(origin, <div prop={{horizontal: 'left', vertical: 'top'}} />, 'prop')).to.be.true;
        expect(validatorPasses(origin, <div prop={{horizontal: 'right', vertical: 'bottom'}} />, 'prop')).to.be.true;
    });
    test('invalid origin props fails', () => {
        expect(validatorFails(origin, <div prop={{horizontal: 'center of the things', vertical: 'middle of no where'}} />, 'prop')).to.be.true;
        expect(validatorFails(origin, <div prop={{horizontal: 'left', vertical: 1}} />, 'prop')).to.be.true;
    });
});
