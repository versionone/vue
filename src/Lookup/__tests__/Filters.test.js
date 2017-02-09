import {caseInsensitive, none} from './../Filters';

test('None filter is exported and always returns true', () => {
    expect(none()).toBeTruthy();
});

test('case insensitive filter will return true when a string matches without consideration of case', () => {
    expect(caseInsensitive('abc', '12AbC3')).toBeTruthy();
});

test('case insensitive filter will return false when a string does not match', () => {
    expect(caseInsensitive('abc', '12Ab5C3')).toBeFalsy();
});
