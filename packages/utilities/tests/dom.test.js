import {isDescendant} from './../src/dom';

test('isDescendant will only return true if the child is a descendant of the parent', () => {
    const parent = getParent();
    expect(isDescendant(parent, getNode(parent))).toBeTruthy();
    expect(isDescendant(parent, getNode())).toBeFalsy();
});

function getParent() {
    return {
        parentNode: null,
    };
}
function getNode(parent = null) {
    return {
        parentNode: parent,
    };
}
