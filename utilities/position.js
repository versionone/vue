"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var centerAlignmentDivisor = 2;

var getViewportPosition = exports.getViewportPosition = function getViewportPosition() {
    return {
        bottom: window.innerHeight,
        height: window.document.documentElement.clientHeight,
        left: 0,
        right: window.document.documentElement.clientWidth,
        top: 0,
        width: window.document.documentElement.clientWidth
    };
};

var getPosition = exports.getPosition = function getPosition(element) {
    var el = element;
    var rect = el.getBoundingClientRect();
    var position = {
        height: el.offsetHeight,
        left: rect.left,
        top: rect.top,
        width: el.offsetWidth
    };

    position.right = rect.right || position.left + position.width;
    position.bottom = rect.bottom || position.top + position.height;
    position.center = position.left + (position.right - position.left) / centerAlignmentDivisor;
    position.middle = position.top + (position.bottom - position.top) / centerAlignmentDivisor;

    return position;
};

var isWithinLeftBoundary = exports.isWithinLeftBoundary = function isWithinLeftBoundary(boundingPosition) {
    return function (position) {
        return position.left >= boundingPosition.left;
    };
};
var isWithinRightBoundary = exports.isWithinRightBoundary = function isWithinRightBoundary(boundingPosition) {
    return function (position) {
        return position.right <= boundingPosition.right;
    };
};
var isWithinXBoundary = exports.isWithinXBoundary = function isWithinXBoundary(boundingPosition) {
    var isWithinLeft = isWithinLeftBoundary(boundingPosition);
    var isWithinRight = isWithinRightBoundary(boundingPosition);

    return function (position) {
        return isWithinLeft(position) && isWithinRight(position);
    };
};

var isWithinTopBoundary = exports.isWithinTopBoundary = function isWithinTopBoundary(boundingPosition) {
    return function (position) {
        return position.top >= boundingPosition.top;
    };
};
var isWithinBottomBoundary = exports.isWithinBottomBoundary = function isWithinBottomBoundary(boundingPosition) {
    return function (position) {
        return position.bottom <= boundingPosition.bottom;
    };
};
var isWithinYBoundary = exports.isWithinYBoundary = function isWithinYBoundary(boundingPosition) {
    var isWithinTop = isWithinTopBoundary(boundingPosition);
    var isWithinBottom = isWithinBottomBoundary(boundingPosition);

    return function (position) {
        return isWithinTop(position) && isWithinBottom(position);
    };
};

var isWithinBoundary = exports.isWithinBoundary = function isWithinBoundary(boundingPosition) {
    var isWithinX = isWithinXBoundary(boundingPosition);
    var isWithinY = isWithinYBoundary(boundingPosition);

    return function (position) {
        return isWithinX(position) && isWithinY(position);
    };
};

var isOutsideBoundary = exports.isOutsideBoundary = function isOutsideBoundary(boundingPosition) {
    return function (position) {
        return position.bottom < boundingPosition.top || position.top > boundingPosition.bottom || position.left > boundingPosition.right || position.right < boundingPosition.left;
    };
};

var isColliding = exports.isColliding = function isColliding(referencePosition) {
    var isWithinReference = isWithinBoundary(referencePosition);
    var isOutsideReference = isOutsideBoundary(referencePosition);
    return function (position) {
        return !(isWithinReference(position) || isOutsideReference(position));
    };
};

var isOverlapping = exports.isOverlapping = function isOverlapping(referencePosition) {
    var isCollidingWithReference = isColliding(referencePosition);
    var isWithinReference = isWithinBoundary(referencePosition);
    return function (position) {
        var isReferenceWithinPosition = isWithinBoundary(position);
        return isCollidingWithReference(position) || isWithinReference(position) || isReferenceWithinPosition(referencePosition);
    };
};

var adjustPosition = exports.adjustPosition = function adjustPosition(anchorPosition, anchorOrigin, targetPosition, targetOrigin) {
    var relativeLeftPositionToAnchor = anchorPosition[anchorOrigin.horizontal] - targetPosition[targetOrigin.horizontal];
    var relativeTopPositionToAnchor = anchorPosition[anchorOrigin.vertical] - targetPosition[targetOrigin.vertical];
    return _extends({}, targetPosition, {
        bottom: relativeTopPositionToAnchor + targetPosition.height,
        left: relativeLeftPositionToAnchor,
        right: relativeLeftPositionToAnchor + targetPosition.width,
        top: relativeTopPositionToAnchor
    });
};