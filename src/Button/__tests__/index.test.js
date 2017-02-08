import Button, {IconButton} from './../';
import ButtonComponent from './../Button';
import IconButtonComponent from './../IconButton';

test('a Button component is the default export', () => {
    expect(new Button({})).toBeInstanceOf(ButtonComponent);
});

test('an IconButton component is exported', () => {
    expect(new IconButton({
        store: {
            getState: jest.fn(),
        }
    })).toBeInstanceOf(IconButtonComponent);
});
