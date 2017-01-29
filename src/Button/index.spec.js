import Button, { IconButton } from './';
import ButtonComponent from './Button';
import IconButtonComponent from './IconButton';

suite('Button', () => {
    test('it exports a Button component as the default export', () => {
        expect(new Button({})).to.be.an.instanceof(ButtonComponent);
    });
    test('it exports an IconButton component as the default export', () => {
        expect(new IconButton({})).to.be.an.instanceof(IconButtonComponent);
    });
});
