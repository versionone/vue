"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var stringStartIndex = 0;

var none = exports.none = function none() {
  return true;
};
var caseInsensitive = exports.caseInsensitive = function caseInsensitive(searchText, value) {
  return value.toLowerCase().indexOf(searchText.toLowerCase()) >= stringStartIndex;
};