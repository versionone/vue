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
    isWithinYBoundary,
} from './../position';

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
    expect(position).toEqual(getTopLeftAnchor());
});

test('isWithinLeftBoundary can determine if an element position is to the right the left boundary of another element position', () => {
    expect(isWithinLeftBoundary(getTopLeftAnchor())(getPositionWithinLeftBoundary())).toBeTruthy();
    expect(isWithinLeftBoundary(getTopLeftAnchor())(getPositionNotWithinLeftBoundary())).toBeFalsy();
});

test('isWithinRightBoundary can determine if an element position is to the left the right boundary of another element position', () => {
    expect(isWithinRightBoundary(getTopLeftAnchor())(getPositionWithinRightBoundary())).toBeTruthy();
    expect(isWithinRightBoundary(getTopLeftAnchor())(getPositionNotWithinRightBoundary())).toBeFalsy();
});

test('isWithinTopBoundary can determine if an element position is below the top boundary of another element position', () => {
    expect(isWithinTopBoundary(getTopLeftAnchor())(getPositionWithinTopBoundary())).toBeTruthy();
    expect(isWithinTopBoundary(getTopLeftAnchor())(getPositionNotWithinTopBoundary())).toBeFalsy();
});

test('isWithinBottomBoundary can determine if an element position is above the bottom boundary of another element position', () => {
    expect(isWithinBottomBoundary(getTopLeftAnchor())(getPositionWithinBottomBoundary())).toBeTruthy();
    expect(isWithinBottomBoundary(getTopLeftAnchor())(getPositionNotWithinBottomBoundary())).toBeFalsy();
});

test('isWithinXBoundary can determine if an element position fits horizontally within another element position', () => {
    expect(isWithinXBoundary(getTopLeftAnchor())(getPositionWithinXBoundary())).toBeTruthy();
    expect(isWithinXBoundary(getTopLeftAnchor())(getPositionNotWithinXBoundary())).toBeFalsy();
});

test('isWithinYBoundary can determine if an element position fits vertically within another element position', () => {
    expect(isWithinYBoundary(getTopLeftAnchor())(getPositionWithinYBoundary())).toBeTruthy();
    expect(isWithinYBoundary(getTopLeftAnchor())(getPositionNotWithinYBoundary())).toBeFalsy();
});

test('isWithinBoundary can determine if an element position completely fits within another element position', () => {
    expect(isWithinBoundary(getTopLeftAnchor())(getPositionWithinBoundary())).toBeTruthy();
    expect(isWithinBoundary(getTopLeftAnchor())(getPositionNotWithinBoundary())).toBeFalsy();
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
    };
    const lowerRightOutside = {
        height: 100,
        left: 100,
        top: 100,
        width: 100,
    };
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

test('adjustPositionWithinBoundaries can determine a position relative to an anchor and is nudged up until it fits within the boundary position', () => {
    expect(adjustPositionWithinBoundaries(getBottomLeftAnchor(), getTopRightPosition(), getVerticallyNudgedTarget(), getTopLeftPosition(), getViewPort())).toEqual({
        center: 150,
        height: 200,
        left: 100,
        middle: 100,
        top: 0,
        width: 100,
    });
});

test('adjustPositionWithinBoundaries can determine a position relative to an anchor and is nudged down until it fits within the boundary position', () => {
    expect(adjustPositionWithinBoundaries(getTopLeftAnchor(), getTopRightPosition(), getVerticallyNudgedTarget(), getBottomLeftPosition(), getViewPort())).toEqual({
        center: 150,
        height: 200,
        left: 100,
        middle: 100,
        top: 0,
        width: 100,
    });
});

test('adjustPositionWithinBoundaries can determine a position relative to an anchor and is nudged left until it fits within the boundary position', () => {
    expect(adjustPositionWithinBoundaries(getCenterAnchorPoint(), getTopRightPosition(), getTopRightTarget(), getBottomLeftPosition(), getViewPort())).toEqual({
        center: 150,
        height: 50,
        left: 100,
        middle: 25,
        top: 0,
        width: 100,
    });
});
test('adjustPositionWithinBoundaries can determine a position relative to an anchor and is nudged right until it fits within the boundary position', () => {
    expect(adjustPositionWithinBoundaries(getCenterAnchorPoint(), getTopLeftPosition(), getTopLeftTarget(), getBottomRightPosition(), getViewPort())).toEqual({
        center: 50,
        height: 50,
        left: 0,
        middle: 25,
        top: 0,
        width: 100,
    });
});

// ---
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
function getViewPort() {
    return {
        height: 200,
        left: 0,
        top: 0,
        width: 200,
    };
}
function getVerticallyNudgedTarget() {
    return {
        center: 50,
        height: 200,
        left: 0,
        middle: 100,
        top: 0,
        width: 100,
    };
}
function getTopRightTarget() {
    return {
        center: 200,
        height: 50,
        left: 0,
        middle: 25,
        top: 0,
        width: 100,
    };
}
function getTopLeftTarget() {
    return {
        center: 0,
        height: 50,
        left: 0,
        middle: 25,
        top: 0,
        width: 100,
    };
}
function getBottomLeftAnchor() {
    return {
        center: 50,
        height: 100,
        left: 0,
        middle: 150,
        top: 100,
        width: 100,
    };
}
function getTopLeftAnchor() {
    return {
        center: 50,
        height: 100,
        left: 0,
        middle: 50,
        top: 0,
        width: 100,
    };
}
function getCenterAnchorPoint() {
    return {
        center: 100,
        left: 50,
        middle: 100,
        top: 50,
        width: 100,
    };
}
function getBottomLeftPosition() {
    return {
        horizontal: 'left',
        vertical: 'bottom',
    };
}
function getTopRightPosition() {
    return {
        horizontal: 'right',
        vertical: 'top',
    };
}
function getTopLeftPosition() {
    return {
        horizontal: 'left',
        vertical: 'top',
    };
}
function getBottomRightPosition() {
    return {
        horizontal: 'right',
        vertical: 'bottom',
    };
}
