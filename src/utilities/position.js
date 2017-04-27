import * as Positions from './../Popover/Positions';

const centerAlignmentDivisor = 2;

export const getViewportPosition = () => ({
    height: window.document.documentElement.clientHeight,
    left: 0,
    top: 0,
    width: window.document.documentElement.clientWidth,
});

export const getPosition = (element) => {
    const el = element;
    const rect = el.getBoundingClientRect();
    const position = {
        height: el.offsetHeight,
        left: rect.left,
        top: rect.top,
        width: el.offsetWidth,
    };

    position.center = position.left + position.width / centerAlignmentDivisor;
    position.middle = position.top + position.height / centerAlignmentDivisor;

    return position;
};

export const isWithinLeftBoundary = (boundingPosition) => (position) => position.left >= boundingPosition.left;
export const isWithinRightBoundary = (boundingPosition) => (position) => position.left + position.width <= boundingPosition.left + boundingPosition.width;
export const isWithinXBoundary = (boundingPosition) => {
    const isWithinLeft = isWithinLeftBoundary(boundingPosition);
    const isWithinRight = isWithinRightBoundary(boundingPosition);

    return (position) => isWithinLeft(position) && isWithinRight(position);
};

export const isWithinTopBoundary = (boundingPosition) => (position) => position.top >= boundingPosition.top;
export const isWithinBottomBoundary = (boundingPosition) => (position) => (position.top + position.height) <= (boundingPosition.top + boundingPosition.height);
export const isWithinYBoundary = (boundingPosition) => {
    const isWithinTop = isWithinTopBoundary(boundingPosition);
    const isWithinBottom = isWithinBottomBoundary(boundingPosition);

    return (position) => isWithinTop(position) && isWithinBottom(position);
};

export const isWithinBoundary = (boundingPosition) => {
    const isWithinX = isWithinXBoundary(boundingPosition);
    const isWithinY = isWithinYBoundary(boundingPosition);

    return (position) => isWithinX(position) && isWithinY(position);
};

export const getUnion = (positionA, positionB) => {
    const left = Math.min(positionA.left, positionB.left);
    const top = Math.min(positionA.top, positionB.top);
    const width = Math.max(positionA.left + positionA.width, positionB.left + positionB.width) - left;
    const height = Math.max(positionA.top + positionA.height, positionB.top + positionB.height) - top;
    return {
        height,
        left,
        top,
        width,
    };
}

export const adjustPositionWithinBoundaries = (anchorPosition, anchorOrigin, targetPosition, targetOrigin, boundaryPosition, nudgeProps) => {
    // TODO check that horizontal for anchor and target are valid choices
    const horizontalAnchorOperands = {
        [Positions.right]: anchorPosition.left + anchorPosition.width,
        [Positions.center]: anchorPosition.center,
        [Positions.left]: anchorPosition.left,
    };
    const horizontalTargetOperands = {
        [Positions.right]: targetPosition.width,
        [Positions.center]: targetPosition.center,
        [Positions.left]: 0,
    };
    let relativeLeftPositionToAnchor = horizontalAnchorOperands[anchorOrigin.horizontal] - horizontalTargetOperands[targetOrigin.horizontal];

    const verticalAnchorOperands = {
        [Positions.bottom]: anchorPosition.top + anchorPosition.height,
        [Positions.middle]: anchorPosition.middle,
        [Positions.top]: anchorPosition.top,
    }
    const verticalTargetOperands = {
        [Positions.bottom]: targetPosition.height,
        [Positions.middle]: targetPosition.middle,
        [Positions.top]: 0,
    }
    let relativeTopPositionToAnchor = verticalAnchorOperands[anchorOrigin.vertical] - verticalTargetOperands[targetOrigin.vertical];

    let union = getUnion(boundaryPosition, {
        ...targetPosition,
        left: relativeLeftPositionToAnchor,
        top: relativeTopPositionToAnchor,
    });

    if (nudgeProps && nudgeProps.nudgeYAxis) {
        const belowBoundaryDiff = (union.top + union.height) - (boundaryPosition.top + boundaryPosition.height);
        if (belowBoundaryDiff > 0) {
            relativeTopPositionToAnchor -= belowBoundaryDiff;
        }

        const aboveBoundaryDiff = (boundaryPosition.top) - (union.top);
        if (aboveBoundaryDiff > 0) {
            relativeTopPositionToAnchor += aboveBoundaryDiff;
        }
    }

    if (nudgeProps && nudgeProps.nudgeXAxis) {
        const leftOfBoundaryDiff = (boundaryPosition.left) - (union.left);
        if (leftOfBoundaryDiff > 0) {
            relativeLeftPositionToAnchor += leftOfBoundaryDiff;
        }

        const rightOfBoundaryDiff = (union.left + union.width) - (boundaryPosition.left + boundaryPosition.width);
        if (rightOfBoundaryDiff > 0) {
            relativeLeftPositionToAnchor -= rightOfBoundaryDiff;
        }
    }

    return {
        ...targetPosition,
        center: relativeLeftPositionToAnchor + targetPosition.width / 2,
        left: relativeLeftPositionToAnchor,
        top: relativeTopPositionToAnchor,
    };
};
