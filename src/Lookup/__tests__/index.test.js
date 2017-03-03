import Lookup, {AssetLookup} from './../';
import LookupComponent from '../Lookup';

test('a Lookup component is exported', () => {
    expect(new Lookup({
        selectedItems: [],
    })).toBeInstanceOf(LookupComponent);
});
