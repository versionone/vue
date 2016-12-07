import React from 'react';
import componentType from './componentType';
import TextField from './../../TextField';
import Button from './../../Button';
import {validatorFails, validatorPasses} from './../../../specHelpers/callValidator';

suite('componentType PropType', () => {
    test('a property of the specified component type passes', () => {
        expect(validatorPasses(componentType(TextField), (<div textField={TextField} />), 'textField')).to.be.true;
    });

    test('a property that is not the specified component type fails', () => {
        expect(validatorFails(componentType(Button), (<div textField={TextField} />), 'textField')).to.be.true;
    });

    test('all children must match the component type', () => {
        expect(validatorFails(componentType(Button), (<div><TextField /></div>), 'children')).to.be.true;
        expect(validatorFails(componentType(Button), (<div><Button /><TextField /></div>), 'children')).to.be.true;
        expect(validatorPasses(componentType(Button), (<div><Button /><Button /></div>), 'children')).to.be.true;
    });
});
