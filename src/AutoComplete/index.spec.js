import AutoComplete from './';
import AutoCompleteComponent from './AutoComplete';


suite('AutoComplete', () => {
    test('an AutoComplete component is publicly exported from Vue', () => {
        expect(new AutoComplete({})).to.be.an.instanceOf(AutoCompleteComponent);
    });
});
