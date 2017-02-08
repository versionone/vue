import {
    getPosition,
    getViewportPosition,
    isWithinBottomBoundary,
    isWithinLeftBoundary,
    isWithinRightBoundary,
    isWithinTopBoundary,
    isWithinXBoundary
} from './../position';

const testPosition = {
    bottom: 100,
    center: 50,
    height: 100,
    left: 0,
    middle: 50,
    right: 100,
    top: 0,
    width: 100,
};

test('viewPort position can be obtained', () => {
    window.innerHeight = 800;
    window.document.documentElement.clientHeight = 786;
    window.document.documentElement.clientWidth = 600;
    expect(getViewportPosition()).toEqual({
        bottom: 800,
        height: 786,
        left: 0,
        right: 600,
        top: 0,
        width: 600,
    });
});

test('the position of an element can be obtained', () => {
    const el = {
        getBoundingClientRect: jest.fn().mockReturnValue({
            bottom: 100,
            left: 0,
            right: 100,
            top: 0,
        }),
        offsetHeight: 100,
        offsetWidth: 100,
    };
    const position = getPosition(el);
    expect(position).toEqual(testPosition);
});

test('can determine if an element position is to the right the left boundary of another element position', () => {
    expect(isWithinLeftBoundary(testPosition)(getPositionWithinLeftBoundary())).toBeTruthy();
    expect(isWithinLeftBoundary(testPosition)(getPositionNotWithinLeftBoundary())).toBeFalsy();
});

test('can determine if an element position is to the left the right boundary of another element position', () => {
    expect(isWithinRightBoundary(testPosition)(getPositionWithinRightBoundary())).toBeTruthy();
    expect(isWithinRightBoundary(testPosition)(getPositionNotWithinRightBoundary())).toBeFalsy();
});

test('can determine if an element position is below the top boundary of another element position', () => {
    expect(isWithinTopBoundary(testPosition)(getPositionWithinTopBoundary())).toBeTruthy();
    expect(isWithinTopBoundary(testPosition)(getPositionNotWithinTopBoundary())).toBeFalsy();
});

test('can determine if an element position is above the bottom boundary of another element position', () => {
    expect(isWithinBottomBoundary(testPosition)(getPositionWithinBottomBoundary())).toBeTruthy();
    expect(isWithinBottomBoundary(testPosition)(getPositionNotWithinBottomBoundary())).toBeFalsy();
});

test('can determine if an element position fits horizontally within another element position', () => {
    expect(isWithinXBoundary(testPosition)(getPositionWithinXBoundary())).toBeTruthy();
    expect(isWithinXBoundary(testPosition)(getPositionNotWithinXBoundary())).toBeFalsy();
});

test('can determine if an element position fits vertically within another element position', () => {
    throw new Error('Not Implemented Error');
});

test('can determine if an element position completely fits within another element position', () => {
    throw new Error('Not Implemented Error');
});

test('can determine if an element position is colliding with another element position', () => {
    throw new Error('Not Implemented Error');
});

test('can determine if an element position overlaps another element position', () => {
    throw new Error('Not Implemented Error');
});

function getPositionWithinLeftBoundary() {
    return {
        left: 80,
    };
}
function getPositionNotWithinLeftBoundary() {
    return {
        left: -10,
    };
}
function getPositionWithinRightBoundary() {
    return {
        right: 80,
    };
}
function getPositionNotWithinRightBoundary() {
    return {
        right: 150,
    };
}
function getPositionWithinTopBoundary() {
    return {
        top: 80,
    };
}
function getPositionNotWithinTopBoundary() {
    return {
        top: -10,
    };
}
function getPositionWithinBottomBoundary() {
    return {
        bottom: 80,
    };
}
function getPositionNotWithinBottomBoundary() {
    return {
        bottom: 150,
    };
}
function getPositionWithinXBoundary() {
    return {
        left: 20,
        right: 80,
    };
}
function getPositionNotWithinXBoundary() {
    return {
        left: 20,
        right: 150,
    };
}
