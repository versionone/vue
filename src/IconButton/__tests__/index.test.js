import IconButton from './../';
import IconButtonComponent from './../IconButton';

test('an IconButton component is exported', () => {
    expect(new IconButton({
        store: {
            getState: jest.fn(),
        }
    })).toBeInstanceOf(IconButtonComponent);
});
