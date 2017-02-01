const centerAlignmentDivisor = 2;

export const isDescendant = (parent, child) => {
    let node = child.parentNode;

    while (node !== null) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
};

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

export const isColliding = (referencePosition) => (position) => (position.top > referencePosition.bottom
|| position.right < referencePosition.left
|| position.bottom < referencePosition.top
|| position.left > referencePosition.right);

export const isInside = (referencePosition) => (position) => position.top <= referencePosition.top
&& referencePosition.top <= position.bottom
&& position.top <= referencePosition.bottom
&& referencePosition.bottom <= position.bottom
&& position.left <= referencePosition.left
&& referencePosition.left <= position.right
&& position.left <= referencePosition.right
&& referencePosition.right <= position.right;

export const isOverlapping = (referencePosition) => {
    const isCollidingWithReference = isColliding(referencePosition);
    const isInsideReference = isInside(referencePosition);

    return (position) => isCollidingWithReference(position) || isInsideReference(position);
};

export const adjustPositionRelativeWithin = (boundingPosition, anchorPosition, anchorOrigin) => {
    const isWithinLeft = isWithinLeftBoundary(boundingPosition);
    const isWithinRight = isWithinRightBoundary(boundingPosition);
    const isWithinTop = isWithinTopBoundary(boundingPosition);
    const isWithinBottom = isWithinBottomBoundary(boundingPosition);
    const isInsideAnchor = isInside(anchorPosition);
    const isOverlappingAnchor = isOverlapping(anchorPosition);

    return (targetPosition, targetOrigin) => {
        const relativeLeftPositionToAnchor = (anchorPosition[anchorOrigin.horizontal] - targetPosition[targetOrigin.horizontal]);
        const relativeTopPositionToAnchor = (anchorPosition[anchorOrigin.vertical] - targetPosition[targetOrigin.vertical]);
        const relativePosition = {
            ...targetPosition,
            bottom: relativeTopPositionToAnchor + targetPosition.height,
            left: relativeLeftPositionToAnchor,
            right: relativeLeftPositionToAnchor + targetPosition.width,
            top: relativeTopPositionToAnchor,
        };
        if (isInsideAnchor(relativePosition)) {
            return relativePosition;
        }
        const nonOverlappingRelativePosition = {
            ...relativePosition,
        };
        if (!isWithinLeft(nonOverlappingRelativePosition)) {
            const leftDifference = Math.abs(nonOverlappingRelativePosition.left - boundingPosition.left);
            nonOverlappingRelativePosition.left = 0;
            nonOverlappingRelativePosition.right = nonOverlappingRelativePosition.right + leftDifference;
            if (isOverlappingAnchor(nonOverlappingRelativePosition)) {
                nonOverlappingRelativePosition.left = anchorPosition.right;
                nonOverlappingRelativePosition.right = anchorPosition.right + nonOverlappingRelativePosition.width;
            }
        }
        else if (!isWithinRight(nonOverlappingRelativePosition)) {
            const rightDifference = Math.abs(nonOverlappingRelativePosition.right - boundingPosition.right);
            nonOverlappingRelativePosition.right = 0;
            nonOverlappingRelativePosition.left = nonOverlappingRelativePosition.left - rightDifference;
            if (isOverlappingAnchor(nonOverlappingRelativePosition)) {
                nonOverlappingRelativePosition.left = anchorPosition.left - nonOverlappingRelativePosition.width;
                nonOverlappingRelativePosition.right = anchorPosition.left;
            }
        }
        else if (!isWithinTop(nonOverlappingRelativePosition)) {
            const topDifference = Math.abs(nonOverlappingRelativePosition.top - boundingPosition.top);
            nonOverlappingRelativePosition.top = 0;
            nonOverlappingRelativePosition.bottom = nonOverlappingRelativePosition.bottom + topDifference;
            if (isOverlappingAnchor(nonOverlappingRelativePosition)) {
                nonOverlappingRelativePosition.top = anchorPosition.bottom;
                nonOverlappingRelativePosition.bottom = anchorPosition.bottom + nonOverlappingRelativePosition.height;
            }
        }
        else if (!isWithinBottom(nonOverlappingRelativePosition)) {
            const bottomDifference = Math.abs(nonOverlappingRelativePosition.bottom - boundingPosition.bottom);
            nonOverlappingRelativePosition.bottom = 0;
            nonOverlappingRelativePosition.top = nonOverlappingRelativePosition.top + bottomDifference;
            if (isOverlappingAnchor(nonOverlappingRelativePosition)) {
                nonOverlappingRelativePosition.bottom = anchorPosition.top;
                nonOverlappingRelativePosition.top = anchorPosition.top + nonOverlappingRelativePosition.height;
            }
        }

        return nonOverlappingRelativePosition;
    };
};
