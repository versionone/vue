import {isDescendant} from './dom';

suite('isDescendant', () => {
    test('it is a function', () => {
        expect(isDescendant).to.be.a('function');
    });

    test('a node that is not a child returns false', () => {
        const parent = getParent();
        const child = {parentNode: null};
        expect(isDescendant(parent, child)).to.be.false;
    });

    test('an immediate child of a parent returns true', () => {
        const parent = getParent();
        const child = getImmediateChild(parent);
        expect(isDescendant(parent, child)).to.be.true;
    });

    test('a child that is a grandchild to a parent returns true', () => {
        const parent = getParent();
        const child = getImmediateChild(parent);
        const grandChild = getImmediateChild(child);
        expect(isDescendant(parent, grandChild)).to.be.true;
    });
});

function getParent() {
    return {parentNode: null};
}

function getImmediateChild(parent) {
    return {parentNode: parent};
}
