'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.adjustPositionWithinBoundaries = exports.getUnion = exports.isWithinBoundary = exports.isWithinYBoundary = exports.isWithinBottomBoundary = exports.isWithinTopBoundary = exports.isWithinXBoundary = exports.isWithinRightBoundary = exports.isWithinLeftBoundary = exports.getPosition = exports.getDocumentPosition = exports.getViewportPosition = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _Positions = require('./../Popover/Positions');

var Positions = _interopRequireWildcard(_Positions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var centerAlignmentDivisor = 2;
var outsideBoundaryThreshold = 0;

var getViewportPosition = exports.getViewportPosition = function getViewportPosition() {
    return {
        height: window.document.documentElement.clientHeight,
        left: 0,
        top: 0,
        width: window.document.documentElement.clientWidth
    };
};
var getDocumentPosition = exports.getDocumentPosition = function getDocumentPosition() {
    return {
        height: document.documentElement.scrollHeight,
        left: 0,
        top: 0,
        width: document.documentElement.scrollWidth
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

    position.center = position.left + position.width / centerAlignmentDivisor;
    position.middle = position.top + position.height / centerAlignmentDivisor;

    return position;
};

var isWithinLeftBoundary = exports.isWithinLeftBoundary = function isWithinLeftBoundary(boundingPosition) {
    return function (position) {
        return position.left >= boundingPosition.left;
    };
};
var isWithinRightBoundary = exports.isWithinRightBoundary = function isWithinRightBoundary(boundingPosition) {
    return function (position) {
        return position.left + position.width <= boundingPosition.left + boundingPosition.width;
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
        return position.top + position.height <= boundingPosition.top + boundingPosition.height;
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

var getUnion = exports.getUnion = function getUnion(positionA, positionB) {
    var left = Math.min(positionA.left, positionB.left);
    var top = Math.min(positionA.top, positionB.top);
    var width = Math.max(positionA.left + positionA.width, positionB.left + positionB.width) - left;
    var height = Math.max(positionA.top + positionA.height, positionB.top + positionB.height) - top;
    return {
        height: height,
        left: left,
        top: top,
        width: width
    };
};

function hasHorizontalOverlap(anchorOrigin, targetOrigin) {
    return !(anchorOrigin.horizontal === Positions.left && targetOrigin.horizontal === Positions.right || anchorOrigin.horizontal === Positions.right && targetOrigin.horizontal === Positions.left);
}

function hasVerticalOverlap(anchorOrigin, targetOrigin) {
    return !(anchorOrigin.vertical === Positions.top && targetOrigin.vertical === Positions.bottom || anchorOrigin.vertical === Positions.bottom && targetOrigin.vertical === Positions.top);
}

var adjustPositionWithinBoundaries = exports.adjustPositionWithinBoundaries = function adjustPositionWithinBoundaries(anchorPosition, anchorOrigin, targetPosition, targetOrigin, boundaryPosition) {
    var _horizontalAnchorOper, _horizontalTargetOper, _verticalAnchorOperan, _verticalTargetOperan;

    // TODO check that horizontal for anchor and target are valid choices
    var horizontalAnchorOperands = (_horizontalAnchorOper = {}, _defineProperty(_horizontalAnchorOper, Positions.right, anchorPosition.left + anchorPosition.width), _defineProperty(_horizontalAnchorOper, Positions.center, anchorPosition.center), _defineProperty(_horizontalAnchorOper, Positions.left, anchorPosition.left), _horizontalAnchorOper);
    var horizontalTargetOperands = (_horizontalTargetOper = {}, _defineProperty(_horizontalTargetOper, Positions.right, targetPosition.width), _defineProperty(_horizontalTargetOper, Positions.center, targetPosition.center), _defineProperty(_horizontalTargetOper, Positions.left, 0), _horizontalTargetOper);
    var relativeLeftPositionToAnchor = horizontalAnchorOperands[anchorOrigin.horizontal] - horizontalTargetOperands[targetOrigin.horizontal];

    var verticalAnchorOperands = (_verticalAnchorOperan = {}, _defineProperty(_verticalAnchorOperan, Positions.bottom, anchorPosition.top + anchorPosition.height), _defineProperty(_verticalAnchorOperan, Positions.middle, anchorPosition.middle), _defineProperty(_verticalAnchorOperan, Positions.top, anchorPosition.top), _verticalAnchorOperan);
    var verticalTargetOperands = (_verticalTargetOperan = {}, _defineProperty(_verticalTargetOperan, Positions.bottom, targetPosition.height), _defineProperty(_verticalTargetOperan, Positions.middle, targetPosition.middle), _defineProperty(_verticalTargetOperan, Positions.top, 0), _verticalTargetOperan);
    var relativeTopPositionToAnchor = verticalAnchorOperands[anchorOrigin.vertical] - verticalTargetOperands[targetOrigin.vertical];

    var union = getUnion(boundaryPosition, _extends({}, targetPosition, {
        left: relativeLeftPositionToAnchor,
        top: relativeTopPositionToAnchor
    }));

    var nudgedVertically = false;
    if (hasHorizontalOverlap(anchorOrigin, targetOrigin)) {
        // flip alignment from below to above or above to below if target box exceeds boundary box
        var belowBoundaryDiff = union.top + union.height - (boundaryPosition.top + boundaryPosition.height);
        if (belowBoundaryDiff > outsideBoundaryThreshold) {
            // TODO possibly flip target to above anchor
        }

        var aboveBoundaryDiff = boundaryPosition.top - union.top;
        if (aboveBoundaryDiff > outsideBoundaryThreshold) {
            // TODO possibly flip target to below anchor
        }
    } else {
        // nudge vertically, only if anchored to the left or the right (no horizontal overlap)
        var _belowBoundaryDiff = union.top + union.height - (boundaryPosition.top + boundaryPosition.height);
        if (_belowBoundaryDiff > outsideBoundaryThreshold) {
            nudgedVertically = true;
            relativeTopPositionToAnchor -= _belowBoundaryDiff;
        }

        var _aboveBoundaryDiff = boundaryPosition.top - union.top;
        if (_aboveBoundaryDiff > outsideBoundaryThreshold) {
            nudgedVertically = true;
            relativeTopPositionToAnchor += _aboveBoundaryDiff;
        }
    }

    if (hasVerticalOverlap(anchorOrigin, targetOrigin)) {
        var leftOfBoundaryDiff = boundaryPosition.left - union.left;
        if (leftOfBoundaryDiff > outsideBoundaryThreshold) {
            // TODO possibly flip target to the right of anchor
        }

        var rightOfBoundaryDiff = union.left + union.width - (boundaryPosition.left + boundaryPosition.width);
        if (rightOfBoundaryDiff > outsideBoundaryThreshold) {
            // TODO possibly flip target to the left of anchor
        }
    } else if (!nudgedVertically) {
        // nudge horizontally, only if anchored to the top or the bottom and not already nudged vertically
        var _leftOfBoundaryDiff = boundaryPosition.left - union.left;
        if (_leftOfBoundaryDiff > outsideBoundaryThreshold) {
            relativeLeftPositionToAnchor += _leftOfBoundaryDiff;
        }

        var _rightOfBoundaryDiff = union.left + union.width - (boundaryPosition.left + boundaryPosition.width);
        if (_rightOfBoundaryDiff > outsideBoundaryThreshold) {
            relativeLeftPositionToAnchor -= _rightOfBoundaryDiff;
        }
    }

    return _extends({}, targetPosition, {
        center: relativeLeftPositionToAnchor + targetPosition.width / centerAlignmentDivisor,
        left: relativeLeftPositionToAnchor,
        middle: relativeTopPositionToAnchor + targetPosition.height / centerAlignmentDivisor,
        top: relativeTopPositionToAnchor
    });
};