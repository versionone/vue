import List, {ListItem} from './../';
import ListComponent from '../List';
import ListItemComponent from '../ListItem';

test('a List is exported as default', () => {
    expect(new List({
        store: {
            getState: jest.fn(),
        }
    })).toBeInstanceOf(ListComponent);
});

test('a ListItem is exported', () => {
    expect(new ListItem({})).toBeInstanceOf(ListItemComponent);
});
