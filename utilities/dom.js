"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var isDescendant = exports.isDescendant = function isDescendant(parent, child) {
    var node = child.parentNode;

    while (node) {
        if (node === parent) {
            return true;
        }
        node = node.parentNode;
    }

    return false;
};