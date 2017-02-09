import React from 'react';
import oneOfComponentType from './../oneOfComponentType';
import TextField from './../../../TextField';
import Button from './../../../Button';
import {validatorFails, validatorPasses} from './../../../../specHelpers/callValidator';

test('a property must be one of the specified component types', () => {
    expect(validatorPasses(oneOfComponentType([TextField, Button]), <div prop={Button} />, 'prop')).toBeTruthy();
    expect(validatorFails(oneOfComponentType([TextField]), <div prop={Button} />, 'prop')).toBeTruthy();
});

test('all children must be one of the specified component types', () => {
    expect(validatorPasses(oneOfComponentType([TextField, Button]), <div><Button /></div>, 'children')).toBeTruthy();
    expect(validatorPasses(oneOfComponentType([TextField, Button]), <div><Button /><TextField />
    </div>, 'children')).toBeTruthy();
    expect(validatorFails(oneOfComponentType([TextField, Button]), <div><Button />
        <div />
    </div>, 'children')).toBeTruthy();
});
