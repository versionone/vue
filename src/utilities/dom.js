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

export const adjustPositionRelative = (anchorPosition, anchorOrigin) => (targetPosition, targetOrigin) => {
    return {
        ...targetPosition,
        left: (anchorPosition[anchorOrigin.horizontal] - targetPosition[targetOrigin.horizontal]),
        top: (anchorPosition[anchorOrigin.vertical] - targetPosition[targetOrigin.vertical]),
    };
};

export const adjustPositionWithin = (boundingPosition) => (targetPosition) => {
    const newPosition = targetPosition;
    if (targetPosition.left < boundingPosition.left) {
        const leftDifference = Math.abs(targetPosition.left - boundingPosition.left);
        newPosition.left = 0;
        newPosition.right = newPosition.right + leftDifference;
    }
    if (targetPosition.left + targetPosition.width > boundingPosition.right) {
        const rightDifference = Math.abs(targetPosition.right - boundingPosition.right);
        newPosition.right = 0;
        newPosition.left = newPosition.left + rightDifference;
    }
    if (targetPosition.top < boundingPosition.top) {
        const topDifference = Math.abs(targetPosition.top - boundingPosition.top);
        newPosition.top = 0;
        newPosition.bottom = targetPosition.bottom + topDifference;
    }
    if (targetPosition.top + targetPosition.height > boundingPosition.bottom) {
        const bottomDifference = Math.abs(targetPosition.bottom - boundingPosition.bottom);
        newPosition.bottom = 0;
        newPosition.top = targetPosition.bottom + bottomDifference;
    }
    console.log('here', boundingPosition, targetPosition, newPosition);
    return targetPosition;
};
