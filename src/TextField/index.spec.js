import sut from './';
import TextField from './TextField';

suite('TextField', () => {
    test('a TextField component is publicly exported from Vue', () => {
        expect(new sut({})).to.be.an.instanceOf(TextField);
    });
});
