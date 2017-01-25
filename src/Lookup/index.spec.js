import Lookup from './';
import LookupComponent from './Lookup';


suite('Lookup', () => {
    test('a Lookup component is publicly exported from Vue', () => {
        expect(new Lookup({})).to.be.an.instanceOf(LookupComponent);
    });
});
