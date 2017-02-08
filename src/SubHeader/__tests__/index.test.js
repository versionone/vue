import SubHeader from './../';
import SubHeaderComponent from './../SubHeader';

test('a SubHeader component is exported as default', () => {
    expect(new SubHeader({})).toBeInstanceOf(SubHeaderComponent);
});
