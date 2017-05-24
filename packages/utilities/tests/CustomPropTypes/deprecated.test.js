import React, {PropTypes} from 'react';
import deprecated from '../../src/CustomPropTypes/deprecated';
import {validatorPasses} from '../../../../testHelpers/callValidator';

test('deprecated propTypes pass through to their inner proptype for validation', () => {
    expect(validatorPasses(deprecated(PropTypes.string, 'this is old yo'), (
        <div prop="my prop" />
    ), 'prop')).toBeTruthy();
});
