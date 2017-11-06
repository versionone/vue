'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var lowestMatchingIndex = 0;
var isOneOf = function isOneOf(typeNames) {
    return function (name) {
        return typeNames.indexOf(name) >= lowestMatchingIndex;
    };
};

exports.default = function (types) {
    return function (props, propName, componentName) {
        var prop = props[propName];
        var typeNames = types.map(function (type) {
            return type.displayName;
        });
        var isOneOfTypes = isOneOf(typeNames);
        if (propName !== 'children' && isOneOfTypes(prop.displayName)) {
            return null;
        }
        var typeNamesForError = typeNames.map(function (name) {
            return '`' + name + '`';
        }).join(', ');

        if (propName === 'children') {
            var childrenNames = _react2.default.Children.toArray(prop).map(function (child) {
                return child.type.displayName;
            });
            var hasOnlyValidChildren = childrenNames.reduce(function (output, childName) {
                return output && isOneOfTypes(childName);
            }, true);

            if (hasOnlyValidChildren) {
                return null;
            }
            return new Error('`' + componentName + '` is only allowed children that are one of the following component types: ' + typeNamesForError + '. Check the render method of `' + componentName + '`');
        }

        return new Error('`' + componentName + '` prop, `' + propName + '`, should be one of the following component types: ' + typeNamesForError + '. Check the render method of `' + componentName + '`');
    };
};