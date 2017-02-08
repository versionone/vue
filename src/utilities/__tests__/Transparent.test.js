import transparent from './../Transparent';

test('Transparent is exported as a transparent rgba color', () => {
    expect(transparent).toEqual('rgba(0,0,0,0)');
});
