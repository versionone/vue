import React from 'react';
import V1Provider from '../V1Provider';

test('V1Provider provides a V1 SDK prop to children via React\'s context', () => {
    const runQuery = jest.fn();
    const v1Provider = new V1Provider({
        runQuery,
    });
    expect(v1Provider.getChildContext().runQuery).toEqual(runQuery);
});
