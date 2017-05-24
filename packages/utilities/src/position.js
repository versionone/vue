import * as Positions from './positionAlignments';

const centerAlignmentDivisor = 2;
const outsideBoundaryThreshold = 0;

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

    position.center = position.left + (position.width / centerAlignmentDivisor);
    position.middle = position.top + (position.height / centerAlignmentDivisor);

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
};

function hasHorizontalOverlap(anchorOrigin, targetOrigin) {
    return !((anchorOrigin.horizontal === Positions.left && targetOrigin.horizontal === Positions.right)
        || (anchorOrigin.horizontal === Positions.right && targetOrigin.horizontal === Positions.left));
}

function hasVerticalOverlap(anchorOrigin, targetOrigin) {
    return !((anchorOrigin.vertical === Positions.top && targetOrigin.vertical === Positions.bottom)
        || (anchorOrigin.vertical === Positions.bottom && targetOrigin.vertical === Positions.top));
}

export const adjustPositionWithinBoundaries = (anchorPosition, anchorOrigin, targetPosition, targetOrigin, boundaryPosition) => {
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
    };
    const verticalTargetOperands = {
        [Positions.bottom]: targetPosition.height,
        [Positions.middle]: targetPosition.middle,
        [Positions.top]: 0,
    };
    let relativeTopPositionToAnchor = verticalAnchorOperands[anchorOrigin.vertical] - verticalTargetOperands[targetOrigin.vertical];

    const union = getUnion(boundaryPosition, {
        ...targetPosition,
        left: relativeLeftPositionToAnchor,
        top: relativeTopPositionToAnchor,
    });

    let nudgedVertically = false;
    if (hasHorizontalOverlap(anchorOrigin, targetOrigin)) {
        // flip alignment from below to above or above to below if target box exceeds boundary box
        const belowBoundaryDiff = (union.top + union.height) - (boundaryPosition.top + boundaryPosition.height);
        if (belowBoundaryDiff > outsideBoundaryThreshold) {
            // TODO possibly flip target to above anchor
        }

        const aboveBoundaryDiff = (boundaryPosition.top) - (union.top);
        if (aboveBoundaryDiff > outsideBoundaryThreshold) {
            // TODO possibly flip target to below anchor
        }
    }
    else {
        // nudge vertically, only if anchored to the left or the right (no horizontal overlap)
        const belowBoundaryDiff = (union.top + union.height) - (boundaryPosition.top + boundaryPosition.height);
        if (belowBoundaryDiff > outsideBoundaryThreshold) {
            nudgedVertically = true;
            relativeTopPositionToAnchor -= belowBoundaryDiff;
        }

        const aboveBoundaryDiff = (boundaryPosition.top) - (union.top);
        if (aboveBoundaryDiff > outsideBoundaryThreshold) {
            nudgedVertically = true;
            relativeTopPositionToAnchor += aboveBoundaryDiff;
        }
    }

    if (hasVerticalOverlap(anchorOrigin, targetOrigin)) {
        const leftOfBoundaryDiff = (boundaryPosition.left) - (union.left);
        if (leftOfBoundaryDiff > outsideBoundaryThreshold) {
            // TODO possibly flip target to the right of anchor
        }

        const rightOfBoundaryDiff = (union.left + union.width) - (boundaryPosition.left + boundaryPosition.width);
        if (rightOfBoundaryDiff > outsideBoundaryThreshold) {
            // TODO possibly flip target to the left of anchor
        }
    }
    else if (!nudgedVertically) {
        // nudge horizontally, only if anchored to the top or the bottom and not already nudged vertically
        const leftOfBoundaryDiff = (boundaryPosition.left) - (union.left);
        if (leftOfBoundaryDiff > outsideBoundaryThreshold) {
            relativeLeftPositionToAnchor += leftOfBoundaryDiff;
        }

        const rightOfBoundaryDiff = (union.left + union.width) - (boundaryPosition.left + boundaryPosition.width);
        if (rightOfBoundaryDiff > outsideBoundaryThreshold) {
            relativeLeftPositionToAnchor -= rightOfBoundaryDiff;
        }
    }

    return {
        ...targetPosition,
        center: relativeLeftPositionToAnchor + (targetPosition.width / centerAlignmentDivisor),
        left: relativeLeftPositionToAnchor,
        middle: relativeTopPositionToAnchor + (targetPosition.height / centerAlignmentDivisor),
        top: relativeTopPositionToAnchor,
    };
};
