import Button from './';
import ButtonComponent from './Button';

suite('Button index', () => {
    test('it exports a Button component as the default export', () => {
        expect(new Button()).to.be.an.instanceof(ButtonComponent);
    });
});