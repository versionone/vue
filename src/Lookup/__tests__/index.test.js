import Lookup, {AssetLookup} from './../';
import AssetLookupComponent from '../AssetLookup';
import LookupComponent from '../Lookup';

test('a Lookup component is exported', () => {
    expect(new Lookup({
        selectedItems: [],
    })).toBeInstanceOf(LookupComponent);
});

test('an AssetLookup component is exported', () => {
    expect(AssetLookup).toEqual(AssetLookupComponent);
});
