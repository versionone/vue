import VueProvider from './../';
import ExpectedProvider from './../VueProvider';

test('Vue exports a Vue Provider', () => {
    expect(new VueProvider()).toBeInstanceOf(ExpectedProvider);
});
