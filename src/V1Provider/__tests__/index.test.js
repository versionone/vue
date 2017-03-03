import V1Provider from './../';
import ExpectedProvider from './../V1Provider';

test('Vue exports a V1Provider', () => {
    expect(new V1Provider()).toBeInstanceOf(ExpectedProvider);
});
