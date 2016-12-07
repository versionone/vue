import React from 'react';
import zDepth from './zDepth';
import {validatorFails, validatorPasses} from './../../../specHelpers/callValidator';

suite('zDepth PropType', () => {
    test('zDepth is between 0 and 5', () => {
        expect(validatorPasses(zDepth, <div prop={0}/>, 'prop')).to.be.true;
        expect(validatorPasses(zDepth, <div prop={1}/>, 'prop')).to.be.true;
        expect(validatorPasses(zDepth, <div prop={2}/>, 'prop')).to.be.true;
        expect(validatorPasses(zDepth, <div prop={3}/>, 'prop')).to.be.true;
        expect(validatorPasses(zDepth, <div prop={4}/>, 'prop')).to.be.true;
        expect(validatorPasses(zDepth, <div prop={5}/>, 'prop')).to.be.true;
        expect(validatorFails(zDepth, <div prop={15}/>, 'prop')).to.be.true;
        expect(validatorFails(zDepth, <div prop={-1}/>, 'prop')).to.be.true;
        expect(validatorFails(zDepth, <div prop={1.5}/>, 'prop')).to.be.true;
    });
});
