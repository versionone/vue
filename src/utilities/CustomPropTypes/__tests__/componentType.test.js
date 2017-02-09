import React from 'react';
import componentType from './../componentType';
import TextField from './../../../TextField';
import Button from './../../../Button';
import {validatorFails, validatorPasses} from '../../../../specHelpers/callValidator';

test('a property of the specified component type passes', () => {
    expect(validatorPasses(componentType(TextField), (<div textField={TextField} />), 'textField')).toBeTruthy();
});

test('a property that is not the specified component type fails', () => {
    expect(validatorFails(componentType(Button), (<div textField={TextField} />), 'textField')).toBeTruthy();
});

test('all children must match the component type', () => {
    expect(validatorFails(componentType(Button), (<div><TextField /></div>), 'children')).toBeTruthy();
    expect(validatorFails(componentType(Button), (<div><Button /><TextField /><Button /></div>), 'children')).toBeTruthy();
    expect(validatorPasses(componentType(Button), (<div><Button /><Button /></div>), 'children')).toBeTruthy();
});
