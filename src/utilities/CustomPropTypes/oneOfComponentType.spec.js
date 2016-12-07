import React from 'react';
import oneOfComponentType from './oneOfComponentType';
import TextField from './../../TextField';
import Button from './../../Button';
import {validatorFails, validatorPasses} from './../../../specHelpers/callValidator';

suite('oneOfComponentType PropType', () => {
    test('a property must be one of the specified component types', () => {
        expect(validatorPasses(oneOfComponentType([TextField, Button]), <div prop={Button}/>, 'prop')).to.be.true;
        expect(validatorFails(oneOfComponentType([TextField]), <div prop={Button}/>, 'prop')).to.be.true;
    });

    test('all children must be one of the specified component types', () => {
        expect(validatorPasses(oneOfComponentType([TextField, Button]), <div><Button /></div>, 'children')).to.be.true;
        expect(validatorPasses(oneOfComponentType([TextField, Button]), <div><Button /><TextField /></div>, 'children')).to.be.true;
        expect(validatorFails(oneOfComponentType([TextField, Button]), <div><Button /><div /></div>, 'children')).to.be.true;
    });
});
