const centerAlignmentDivisor = 2;

export const getViewportPosition = () => ({
    bottom: window.innerHeight,
    height: window.document.documentElement.clientHeight,
    left: 0,
    right: window.document.documentElement.clientWidth,
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

    position.right = rect.right || position.left + position.width;
    position.bottom = rect.bottom || position.top + position.height;
    position.center = position.left + (
            (position.right - position.left) / centerAlignmentDivisor
        );
    position.middle = position.top + (
            (position.bottom - position.top) / centerAlignmentDivisor
        );

    return position;
};

export const isWithinLeftBoundary = (boundingPosition) => (position) => position.left >= boundingPosition.left;
export const isWithinRightBoundary = (boundingPosition) => (position) => position.right <= boundingPosition.right;
export const isWithinXBoundary = (boundingPosition) => {
    const isWithinLeft = isWithinLeftBoundary(boundingPosition);
    const isWithinRight = isWithinRightBoundary(boundingPosition);

    return (position) => isWithinLeft(position) && isWithinRight(position);
};

export const isWithinTopBoundary = (boundingPosition) => (position) => position.top >= boundingPosition.top;
export const isWithinBottomBoundary = (boundingPosition) => (position) => position.bottom <= boundingPosition.bottom;
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

export const isOutsideBoundary = (boundingPosition) => (position) => (
    position.bottom < boundingPosition.top
    || position.top > boundingPosition.bottom
    || position.left > boundingPosition.right
    || position.right < boundingPosition.left
);

export const isColliding = (referencePosition) => {
    const isWithinReference = isWithinBoundary(referencePosition);
    const isOutsideReference = isOutsideBoundary(referencePosition);
    return (position) => !(isWithinReference(position) || isOutsideReference(position));
};

export const isOverlapping = (referencePosition) => {
    const isCollidingWithReference = isColliding(referencePosition);
    const isWithinReference = isWithinBoundary(referencePosition);
    return (position) => {
        const isReferenceWithinPosition = isWithinBoundary(position);
        return isCollidingWithReference(position) || isWithinReference(position) || isReferenceWithinPosition(referencePosition);
    };
};

export const adjustPosition = (anchorPosition, anchorOrigin, targetPosition, targetOrigin) => {
    const relativeLeftPositionToAnchor = (anchorPosition[anchorOrigin.horizontal] - targetPosition[targetOrigin.horizontal]);
    const relativeTopPositionToAnchor = (anchorPosition[anchorOrigin.vertical] - targetPosition[targetOrigin.vertical]);
    return {
        ...targetPosition,
        bottom: relativeTopPositionToAnchor + targetPosition.height,
        left: relativeLeftPositionToAnchor,
        right: relativeLeftPositionToAnchor + targetPosition.width,
        top: relativeTopPositionToAnchor,
    };
};
