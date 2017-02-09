import React, {PropTypes} from 'react';
import deprecated from './../deprecated';
import {validatorPasses} from '../../../../specHelpers/callValidator';

test('deprecated propTypes pass through to their inner proptype for validation', () => {
    expect(validatorPasses(deprecated(PropTypes.string, 'this is old yo'), (
        <div prop="my prop" />
    ), 'prop')).toBeTruthy();
});
