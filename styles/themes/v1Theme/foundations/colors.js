'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yellowAccent = exports.lightSunset = exports.sunglow = exports.sunset = exports.mango = exports.shuttle = exports.pale = exports.gunSmoke = exports.forge = exports.cerulean = exports.gunMetal = exports.midnight = exports.aluminum = exports.lightWhite = exports.mediumGray = exports.darkWhite = exports.fullWhite = exports.faintBlack = exports.minBlack = exports.lightBlack = exports.darkBlack = exports.fullBlack = exports.transparent = exports.white = exports.black = undefined;

var _colorFunctions = require('@andrew-codes/color-functions');

// ## Black, whites, and grays // Examples
var black = exports.black = '#000000';
var white = exports.white = '#ffffff';
var transparent = exports.transparent = 'rgba(0,0,0,0)';
var fullBlack = exports.fullBlack = 'rgba(0,0,0,1)';
var darkBlack = exports.darkBlack = 'rgba(0,0,0,0.87)';
var lightBlack = exports.lightBlack = 'rgba(0,0,0,0.54)';
var minBlack = exports.minBlack = 'rgba(0,0,0,0.26)';
var faintBlack = exports.faintBlack = 'rgba(0,0,0,0.12)';
var fullWhite = exports.fullWhite = 'rgba(255,255,255,1)';
var darkWhite = exports.darkWhite = 'rgba(255,255,255,0.87)';
var mediumGray = exports.mediumGray = 'rgba(0,0,0,0.298039)';
var lightWhite = exports.lightWhite = 'rgba(255,255,255,0.5)';

// ## Named Colors
var aluminum = exports.aluminum = '#878c94';
var midnight = exports.midnight = '#272c34';
var gunMetal = exports.gunMetal = '#31363e';
var cerulean = exports.cerulean = '#00a9e0';
var forge = exports.forge = '#474c54';
var gunSmoke = exports.gunSmoke = '#31363e';
var pale = exports.pale = '#dde2e9';
var shuttle = exports.shuttle = '#61666e';
var mango = exports.mango = '#ea6c02';
var sunset = exports.sunset = '#d52101';
var sunglow = exports.sunglow = '#eaab00';
var lightSunset = exports.lightSunset = (0, _colorFunctions.toRgbaString)((0, _colorFunctions.lighten)(sunset, 0.47));

var yellowAccent = exports.yellowAccent = '#FFF4A3';