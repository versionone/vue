import {
    adjustPositionWithinBoundaries,
    getPosition,
    getUnion,
    getViewportPosition,
    isWithinBottomBoundary,
    isWithinBoundary,
    isWithinLeftBoundary,
    isWithinRightBoundary,
    isWithinTopBoundary,
    isWithinXBoundary,
    isWithinYBoundary
} from './../position';

const topLeftAnchorPoint = {
    center: 50,
    height: 100,
    left: 0,
    middle: 50,
    top: 0,
    width: 100,
};
const topRightAnchorPoint = {
    center: 250,
    height: 100,
    left: 200,
    middle: 50,
    top: 0,
    width: 100,
};
const bottomLeftAnchorPoint = {
    center: 50,
    height: 100,
    left: 0,
    middle: 250,
    top: 200,
    width: 100,
};
const toLeft = {
    horizontal: 'left',
    vertical: 'middle',
};
const toRight = {
    horizontal: 'right',
    vertical: 'middle',
};
const toTop = {
    horizontal: 'center',
    vertical: 'top',
};
const toBottom = {
    horizontal: 'center',
    vertical: 'bottom',
};
const toTopRight = {
    horizontal: 'right',
    vertical: 'top',
};

test.skip('getViewportPosition can get the position of the viewport', () => {
    window.innerHeight = 800;
    window.document.documentElement.clientHeight = 786;
    window.document.documentElement.clientWidth = 600;
    expect(getViewportPosition()).toEqual({
        height: 786,
        left: 0,
        top: 0,
        width: 600,
    });
});

test('getPosition can obtain the position of a provided element', () => {
    const el = {
        getBoundingClientRect: jest.fn().mockReturnValue({
            left: 0,
            top: 0,
        }),
        offsetHeight: 100,
        offsetWidth: 100,
    };
    const position = getPosition(el);
    expect(position).toEqual(topLeftAnchorPoint);
});

test('isWithinLeftBoundary can determine if an element position is to the right the left boundary of another element position', () => {
    expect(isWithinLeftBoundary(topLeftAnchorPoint)(getPositionWithinLeftBoundary())).toBeTruthy();
    expect(isWithinLeftBoundary(topLeftAnchorPoint)(getPositionNotWithinLeftBoundary())).toBeFalsy();
});

test('isWithinRightBoundary can determine if an element position is to the left the right boundary of another element position', () => {
    expect(isWithinRightBoundary(topLeftAnchorPoint)(getPositionWithinRightBoundary())).toBeTruthy();
    expect(isWithinRightBoundary(topLeftAnchorPoint)(getPositionNotWithinRightBoundary())).toBeFalsy();
});

test('isWithinTopBoundary can determine if an element position is below the top boundary of another element position', () => {
    expect(isWithinTopBoundary(topLeftAnchorPoint)(getPositionWithinTopBoundary())).toBeTruthy();
    expect(isWithinTopBoundary(topLeftAnchorPoint)(getPositionNotWithinTopBoundary())).toBeFalsy();
});

test('isWithinBottomBoundary can determine if an element position is above the bottom boundary of another element position', () => {
    expect(isWithinBottomBoundary(topLeftAnchorPoint)(getPositionWithinBottomBoundary())).toBeTruthy();
    expect(isWithinBottomBoundary(topLeftAnchorPoint)(getPositionNotWithinBottomBoundary())).toBeFalsy();
});

test('isWithinXBoundary can determine if an element position fits horizontally within another element position', () => {
    expect(isWithinXBoundary(topLeftAnchorPoint)(getPositionWithinXBoundary())).toBeTruthy();
    expect(isWithinXBoundary(topLeftAnchorPoint)(getPositionNotWithinXBoundary())).toBeFalsy();
});

test('isWithinYBoundary can determine if an element position fits vertically within another element position', () => {
    expect(isWithinYBoundary(topLeftAnchorPoint)(getPositionWithinYBoundary())).toBeTruthy();
    expect(isWithinYBoundary(topLeftAnchorPoint)(getPositionNotWithinYBoundary())).toBeFalsy();
});

test('isWithinBoundary can determine if an element position completely fits within another element position', () => {
    expect(isWithinBoundary(topLeftAnchorPoint)(getPositionWithinBoundary())).toBeTruthy();
    expect(isWithinBoundary(topLeftAnchorPoint)(getPositionNotWithinBoundary())).toBeFalsy();
});

test('getUnion returns the minimum bounding box that encloses the two boxes', () => {
    const positionA = {
        height: 100,
        left: 0,
        top: 0,
        width: 100,
    };
    const rightIntersecting = {
        height: 100,
        left: 50,
        top: 50,
        width: 100,
    };
    const leftIntersecting = {
        height: 100,
        left: -50,
        top: -50,
        width: 100,
    }
    const lowerRightOutside = {
        height: 100,
        left: 100,
        top: 100,
        width: 100,
    }
    expect(getUnion(positionA, positionA)).toEqual(positionA);
    expect(getUnion(positionA, rightIntersecting)).toEqual({
        height: 150,
        left: 0,
        top: 0,
        width: 150,
    });
    expect(getUnion(positionA, leftIntersecting)).toEqual({
        height: 150,
        left: -50,
        top: -50,
        width: 150,
    });
    expect(getUnion(positionA, lowerRightOutside)).toEqual({
        height: 200,
        left: 0,
        top: 0,
        width: 200,
    });
});


test('adjustPositionWithinBoundaries can determine a position relative to an anchor and within a bounding position if possible', () => {
    // expect(adjustPositionWithinBoundaries(topLeftAnchorPoint, toLeft, getTargetPosition(), toRight)).toEqual({
    //     bottom: 100,
    //     center: 50,
    //     height: 100,
    //     left: -100,
    //     middle: 50,
    //     right: 0,
    //     top: 0,
    //     width: 100,
    // });

    // expect(adjustPositionWithinBoundaries(topLeftAnchorPoint, toTop, getTargetPosition(), toBottom)).toEqual({
    //     bottom: 0,
    //     center: 50,
    //     height: 100,
    //     left: 0,
    //     middle: 50,
    //     right: 100,
    //     top: -100,
    //     width: 100,
    // });

    // expect(adjustPositionWithinBoundaries(topRightAnchorPoint, toTopRight, getTargetPosition(), toLeft)).toEqual({
    //     bottom: 100,
    //     center: 50,
    //     height: 100,
    //     left: 300,
    //     middle: 50,
    //     right: 400,
    //     top: 0,
    //     width: 100,
    // });

    // expect(adjustPositionWithinBoundaries(bottomLeftAnchorPoint, toBottom, getTargetPosition(), toTop)).toEqual({
    //     bottom: 400,
    //     center: 50,
    //     height: 100,
    //     left: 0,
    //     middle: 50,
    //     right: 100,
    //     top: 300,
    //     width: 100,
    // });

    // expect(adjustPositionWithinBoundaries(bottomLeftAnchorPoint, toTop, getTargetPosition(), toBottom)).toEqual({
    //     bottom: 200,
    //     center: 50,
    //     height: 100,
    //     left: 0,
    //     middle: 50,
    //     right: 100,
    //     top: 100,
    //     width: 100,
    // });
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
        left: 50,
        width: 25,
    };
}
function getPositionNotWithinRightBoundary() {
    return {
        left: 75,
        width: 50,
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
        top: 0,
        height: 75,
    };
}
function getPositionNotWithinBottomBoundary() {
    return {
        top: 75,
        height: 35,
    };
}
function getPositionWithinXBoundary() {
    return {
        left: 20,
        width: 60,
    };
}
function getPositionNotWithinXBoundary() {
    return {
        left: 20,
        width: 130,
    };
}
function getPositionWithinYBoundary() {
    return {
        top: 20,
        height: 60,
    };
}
function getPositionNotWithinYBoundary() {
    return {
        top: -10,
        height: 160,
    };
}
function getPositionWithinBoundary() {
    return {
        left: 20,
        width: 60,
        top: 80,
        height: 0,
    };
}
function getPositionNotWithinBoundary() {
    return {
        left: 20,
        width: 130,
        top: 20,
        height: 130,
    };
}
function getTargetPosition() {
    return {
        center: 50,
        height: 100,
        left: 0,
        middle: 50,
        top: 0,
        width: 100,
    };
}
