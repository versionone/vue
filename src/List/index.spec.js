import List, {ListItem} from './';
import ListComponent from './List';
import ListItemComponent from './ListItem';

suite('List', () => {
    test('it exports a List component from Vue', () => {
        expect(new List({})).to.be.an.instanceOf(ListComponent);
    });
    test('it exports a ListItem component from Vue', () => {
        expect(new ListItem({})).to.be.an.instanceOf(ListItemComponent);
    });
});
