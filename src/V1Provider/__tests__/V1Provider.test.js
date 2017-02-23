import React from 'react';
import V1Provider from '../V1Provider';

test('V1Provider provides a V1 SDK prop to children via React\'s context', () => {
    const v1 = getV1Sdk();
    const v1Provider = new V1Provider({
        v1,
    });
    expect(v1Provider.getChildContext().v1).toEqual(v1);
});

function getV1Sdk() {
    return {
        query: jest.fn(),
    };
}
