'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var getDisplayName = exports.getDisplayName = function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};

var doNothingHandler = function doNothingHandler() {
    return function () {
        return null;
    };
};
var createEventHandler = exports.createEventHandler = function createEventHandler(handler) {
    for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        rest[_key - 1] = arguments[_key];
    }

    return function (evt) {
        return handler.apply(undefined, [evt].concat(rest));
    };
};
var createConditionalEventHandler = exports.createConditionalEventHandler = function createConditionalEventHandler(condition) {
    if (condition) {
        return createEventHandler;
    }
    return doNothingHandler;
};
var createEventHandlerIgnoringEventData = exports.createEventHandlerIgnoringEventData = function createEventHandlerIgnoringEventData(handler) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
    }

    return function () {
        return handler.apply(undefined, rest);
    };
};