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

export const isWithinLeftBoundary = boundingPosition => position => position.left >= boundingPosition.left;
export const isWithinRightBoundary = boundingPosition => position => position.right <= boundingPosition.right;
export const isWithinXBoundary = (boundingPosition) => {
    const isWithinLeft = isWithinLeftBoundary(boundingPosition);
    const isWithinRight = isWithinRightBoundary(boundingPosition);

    return position => isWithinLeft(position) && isWithinRight(position);
};

export const isWithinTopBoundary = boundingPosition => position => position.top >= boundingPosition.top;
export const isWithinBottomBoundary = boundingPosition => position => position.bottom <= boundingPosition.bottom;
export const isWithinYBoundary = (boundingPosition) => {
    const isWithinTop = isWithinTopBoundary(boundingPosition);
    const isWithinBottom = isWithinBottomBoundary(boundingPosition);

    return position => isWithinTop(position) && isWithinBottom(position);
};

export const isWithinBoundary = (boundingPosition) => {
    const isWithinX = isWithinXBoundary(boundingPosition);
    const isWithinY = isWithinYBoundary(boundingPosition);

    return position => isWithinX(position) && isWithinY(position);
};

export const isColliding = referencePosition => position => !(position.top > referencePosition.bottom
|| position.right < referencePosition.left
|| position.bottom < referencePosition.top
|| position.left > referencePosition.right);

export const isOverlapping = (referencePosition) => {
    const isCollidingWithReference = isColliding(referencePosition);
    const isWithinReference = isWithinBoundary(referencePosition);

    return position => isCollidingWithReference(position) || isWithinReference(position);
};

export const adjustPositionRelativeWithin = (boundingPosition, anchorPosition, anchorOrigin) => {
    const isWithinLeftOfBoundary = isWithinLeftBoundary(boundingPosition);
    const isWithinRightOfBoundary = isWithinRightBoundary(boundingPosition);
    const isWithinTopOfBoundary = isWithinTopBoundary(boundingPosition);
    const isWithinBottomOfBoundary = isWithinBottomBoundary(boundingPosition);

    const isWithinLeftOfAnchor = isWithinLeftBoundary(anchorPosition);
    const isWithinRightOfAnchor = isWithinRightBoundary(anchorPosition);
    const isWithinTopOfAnchor = isWithinTopBoundary(anchorPosition);
    const isWithinBottomOfAnchor = isWithinBottomBoundary(anchorPosition);
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

        if (!isOverlappingAnchor(relativePosition)) {
            return relativePosition;
        }
        const nonOverlappingRelativePosition = {
            ...relativePosition,
        };

        // Adjust if not within viewport in any direction
        if (!isWithinLeftOfBoundary(nonOverlappingRelativePosition)) {
            const leftDifference = Math.abs(nonOverlappingRelativePosition.left - boundingPosition.left);
            nonOverlappingRelativePosition.left = 0;
            nonOverlappingRelativePosition.right += leftDifference;
        }
        else if (!isWithinRightOfBoundary(nonOverlappingRelativePosition)) {
            const rightDifference = Math.abs(nonOverlappingRelativePosition.right - boundingPosition.right);
            nonOverlappingRelativePosition.right = 0;
            nonOverlappingRelativePosition.left -= rightDifference;
        }
        else if (!isWithinTopOfBoundary(nonOverlappingRelativePosition)) {
            const topDifference = Math.abs(nonOverlappingRelativePosition.top - boundingPosition.top);
            nonOverlappingRelativePosition.top = 0;
            nonOverlappingRelativePosition.bottom += topDifference;
        }
        else if (!isWithinBottomOfBoundary(nonOverlappingRelativePosition)) {
            const bottomDifference = Math.abs(nonOverlappingRelativePosition.bottom - boundingPosition.bottom);
            nonOverlappingRelativePosition.bottom = 0;
            nonOverlappingRelativePosition.top += bottomDifference;
        }
        if (!isOverlappingAnchor(nonOverlappingRelativePosition)) {
            return nonOverlappingRelativePosition;
        }

        // Adjust if overlapping anchor in any direction
        if (anchorOrigin.vertical === 'top') {
            if (isWithinTopOfAnchor(nonOverlappingRelativePosition)) {
                nonOverlappingRelativePosition.top = anchorPosition.bottom;
                nonOverlappingRelativePosition.bottom = anchorPosition.bottom + nonOverlappingRelativePosition.height;
            }
        }
        else if (anchorOrigin.vertical === 'bottom' && isWithinBottomOfAnchor(nonOverlappingRelativePosition)) {
            nonOverlappingRelativePosition.bottom = anchorPosition.top;
            nonOverlappingRelativePosition.top = anchorPosition.top - nonOverlappingRelativePosition.height;
        }
        else if (anchorOrigin.horizontal === 'left' && isWithinLeftOfAnchor(nonOverlappingRelativePosition)) {
            nonOverlappingRelativePosition.left = anchorPosition.right;
            nonOverlappingRelativePosition.right = anchorPosition.right + nonOverlappingRelativePosition.width;
        }
        else if (isWithinRightOfAnchor(nonOverlappingRelativePosition)) {
            nonOverlappingRelativePosition.left = anchorPosition.left - nonOverlappingRelativePosition.width;
            nonOverlappingRelativePosition.right = anchorPosition.left;
        }

        return nonOverlappingRelativePosition;
    };
};
