import SubHeader from './';
import SubHeaderComponent from './SubHeader';


suite('SubHeader', () => {
    test('a SubHeader component is publicly exported from Vue', () => {
        expect(new SubHeader({})).to.be.an.instanceOf(SubHeaderComponent);
    });
});
