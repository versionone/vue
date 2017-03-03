import Button from './../';
import ButtonComponent from './../Button';

test('a Button component is the default export', () => {
    expect(new Button({})).toBeInstanceOf(ButtonComponent);
});
