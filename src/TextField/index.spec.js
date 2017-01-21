import TextField from './';
import ExpectedTextField from './TextField';

suite('TextField', () => {
    test('a TextField component is publicly exported from Vue', () => {
        expect(new TextField({})).to.be.an.instanceOf(ExpectedTextField);
    });
});
