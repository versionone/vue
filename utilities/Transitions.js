'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var easeOutFunction = exports.easeOutFunction = 'cubic-bezier(0.23, 1, 0.32, 1)';
var easeInOutFunction = exports.easeInOutFunction = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';

var create = exports.create = function create() {
    var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '450ms';
    var property = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'all';
    var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '0ms';
    var easeFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'linear';
    return property + ' ' + duration + ' ' + easeFunction + ' ' + delay;
};

var easeOut = exports.easeOut = function easeOut(duration, property, delay) {
    var easeFunction = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : easeOutFunction;

    var properties = property;
    if (!property || !Array.isArray(property)) {
        properties = [property];
    }

    return properties.reduce(function (transitionStyles, prop) {
        return transitionStyles.concat(create(duration, prop, delay, easeFunction));
    }, []).join(',');
};