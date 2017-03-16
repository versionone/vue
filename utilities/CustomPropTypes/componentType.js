'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (type) {
    return function (props, propName, componentName) {
        var prop = props[propName];
        if (propName === 'children') {
            var error = null;
            _react2.default.Children.forEach(prop, function (el) {
                if (error) {
                    return;
                }
                if (el.type.displayName !== type.displayName) {
                    error = new Error('`' + componentName + '` is only allowed children that are `' + type.displayName + '` components. Check the render method of `' + componentName + '`');
                }
            });
            return error;
        }
        if (prop.displayName !== type.displayName) {
            return new Error('`' + componentName + '` prop, `' + propName + '`, should be a `' + type.displayName + '` component. Check the render method of `' + componentName + '`');
        }

        return null;
    };
};