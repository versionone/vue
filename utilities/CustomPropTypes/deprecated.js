'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var warned = {};

exports.default = function (validator, reason) {
    return function (props, propName, componentName, location, propFullName) {
        for (var _len = arguments.length, args = Array(_len > 5 ? _len - 5 : 0), _key = 5; _key < _len; _key++) {
            args[_key - 5] = arguments[_key];
        }

        var componentNameSafe = componentName || '<<anonymous>>';
        var propFullNameSafe = propFullName || propName;

        if (props[propName] !== null) {
            var messageKey = componentName + '.' + propName;

            (0, _warning2.default)(warned[messageKey], 'The ' + location + ' `' + propFullNameSafe + '` of `' + componentNameSafe + '` is deprecated. ' + reason);
            warned[messageKey] = true;
        }

        return validator.apply(undefined, [props, propName, componentName, location, propFullName].concat(args));
    };
};