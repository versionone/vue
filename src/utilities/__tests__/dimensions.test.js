import * as dimensions from './../dimensions';

test('throws error when no value is specified', () => {
    expect(() => dimensions.getValue()).toThrow('Value is null or undefined');
    expect(() => dimensions.getUnit()).toThrow('Value is null or undefined');
});

test('valid dimension values can be retrieved', () => {
    expect(dimensions.getValue('10px')).toEqual(10);
});

test('units can be retrieved from a CSS value', () => {
    expect(dimensions.getUnit('10px')).toEqual('px');
});
