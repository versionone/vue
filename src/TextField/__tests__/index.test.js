import TextField from './../';
import ExpectedTextField from './../TextField';

test('a TextField component is exported as default', () => {
    expect(new TextField({})).toBeInstanceOf(ExpectedTextField);
});
