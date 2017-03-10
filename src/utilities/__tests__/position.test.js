import {
    adjustPosition,
    getPosition,
    getViewportPosition,
    isColliding,
    isOverlapping,
    isWithinBottomBoundary,
    isWithinBoundary,
    isWithinLeftBoundary,
    isWithinRightBoundary,
    isWithinTopBoundary,
    isWithinXBoundary,
    isWithinYBoundary
} from './../position';

const topLeftAnchorPoint = {
    bottom: 100,
    center: 50,
    height: 100,
    left: 0,
    middle: 50,
    right: 100,
    top: 0,
    width: 100,
};
const topRightAnchorPoint = {
    bottom: 100,
    center: 250,
    height: 100,
    left: 200,
    middle: 50,
    right: 300,
    top: 0,
    width: 100,
};
const bottomLeftAnchorPoint = {
    bottom: 300,
    center: 50,
    height: 100,
    left: 0,
    middle: 250,
    right: 100,
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

test.skip('getViewportPosition can get the position of the viewport', () => {
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

test('getPosition can obtain the position of a provided element', () => {
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

test('isColliding can determine if an element position is colliding with another element position', () => {
    expect(isColliding(topLeftAnchorPoint)(getPositionNotOverlapping())).toBeFalsy();
    expect(isColliding(topLeftAnchorPoint)(getAdjacentPosition())).toBeTruthy();
    expect(isColliding(topLeftAnchorPoint)(getLeftCollidingPosition())).toBeTruthy();
    expect(isColliding(topLeftAnchorPoint)(getRightCollidingPosition())).toBeTruthy();
    expect(isColliding(topLeftAnchorPoint)(getTopCollidingPosition())).toBeTruthy();
    expect(isColliding(topLeftAnchorPoint)(getLeftRightAroundPosition())).toBeTruthy();
    expect(isColliding(topLeftAnchorPoint)(getTopBottomAroundPosition())).toBeTruthy();
    expect(isColliding(topLeftAnchorPoint)(getBottomCollidingPosition())).toBeTruthy();
    expect(isOverlapping(topLeftAnchorPoint)(getPositionCompletelyAroundAnchor())).toBeTruthy();
});

test('isOverlapping can determine if an element position overlaps with another element position', () => {
    expect(isOverlapping(topLeftAnchorPoint)(getPositionInside())).toBeTruthy();
    expect(isOverlapping(topLeftAnchorPoint)(getLeftCollidingPosition())).toBeTruthy();
    expect(isOverlapping(topLeftAnchorPoint)(getRightCollidingPosition())).toBeTruthy();
    expect(isOverlapping(topLeftAnchorPoint)(getTopCollidingPosition())).toBeTruthy();
    expect(isOverlapping(topLeftAnchorPoint)(getBottomCollidingPosition())).toBeTruthy();
    expect(isOverlapping(topLeftAnchorPoint)(getPositionNotOverlapping())).toBeFalsy();
    expect(isOverlapping(topLeftAnchorPoint)(getAdjacentPosition())).toBeTruthy();
    expect(isOverlapping(topLeftAnchorPoint)(getPositionCompletelyAroundAnchor())).toBeTruthy();
});

test('adjustPosition can determine a position relative to an anchor', () => {
    expect(adjustPosition(topLeftAnchorPoint, toLeft, getTargetPosition(), toRight)).toEqual({
        bottom: 100,
        center: 50,
        height: 100,
        left: -100,
        middle: 50,
        right: 0,
        top: 0,
        width: 100,
    });

    expect(adjustPosition(topLeftAnchorPoint, toTop, getTargetPosition(), toBottom)).toEqual({
        bottom: 0,
        center: 50,
        height: 100,
        left: 0,
        middle: 50,
        right: 100,
        top: -100,
        width: 100,
    });

    expect(adjustPosition(topRightAnchorPoint, toRight, getTargetPosition(), toLeft)).toEqual({
        bottom: 100,
        center: 50,
        height: 100,
        left: 300,
        middle: 50,
        right: 400,
        top: 0,
        width: 100,
    });

    expect(adjustPosition(bottomLeftAnchorPoint, toBottom, getTargetPosition(), toTop)).toEqual({
        bottom: 400,
        center: 50,
        height: 100,
        left: 0,
        middle: 50,
        right: 100,
        top: 300,
        width: 100,
    });

    expect(adjustPosition(bottomLeftAnchorPoint, toTop, getTargetPosition(), toBottom)).toEqual({
        bottom: 200,
        center: 50,
        height: 100,
        left: 0,
        middle: 50,
        right: 100,
        top: 100,
        width: 100,
    });
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
function getPositionWithinYBoundary() {
    return {
        bottom: 80,
        top: 20,
    };
}
function getPositionNotWithinYBoundary() {
    return {
        bottom: 150,
        top: -10,
    };
}
function getPositionWithinBoundary() {
    return {
        bottom: 80,
        left: 20,
        right: 80,
        top: 80,
    };
}
function getPositionNotWithinBoundary() {
    return {
        bottom: 150,
        left: 20,
        right: 150,
        top: 20,
    };
}
function getLeftCollidingPosition() {
    return {
        bottom: 100,
        left: -20,
        right: 80,
        top: 0,
    };
}
function getRightCollidingPosition() {
    return {
        bottom: 100,
        left: 20,
        right: 180,
        top: 0,
    };
}
function getTopCollidingPosition() {
    return {
        bottom: 100,
        left: 0,
        right: 80,
        top: -100,
    };
}
function getBottomCollidingPosition() {
    return {
        bottom: 400,
        left: 0,
        right: 100,
        top: 20,
    };
}
function getPositionInside() {
    return {
        bottom: 80,
        left: 20,
        right: 80,
        top: 20,
    };
}
function getPositionNotOverlapping() {
    return {
        bottom: 300,
        left: 150,
        right: 300,
        top: 150,
    };
}
function getTargetPosition() {
    return {
        bottom: 100,
        center: 50,
        height: 100,
        left: 0,
        middle: 50,
        right: 100,
        top: 0,
        width: 100,
    };
}
function getAdjacentPosition() {
    return {
        bottom: 200,
        center: 50,
        height: 100,
        left: 0,
        middle: 50,
        right: 100,
        top: 100,
        width: 100,
    };
}
function getPositionCompletelyAroundAnchor() {
    return {
        bottom: 400,
        center: 50,
        height: 500,
        left: -100,
        middle: 50,
        right: 400,
        top: -100,
        width: 500,
    };
}
function getLeftRightAroundPosition() {
    return {
        bottom: 100,
        center: 50,
        height: 100,
        left: -100,
        middle: 250,
        right: 400,
        top: 0,
        width: 500,
    };
}

function getTopBottomAroundPosition() {
    return {
        bottom: 400,
        center: 250,
        height: 500,
        left: 0,
        middle: 50,
        right: 100,
        top: -100,
        width: 100,
    };
}
