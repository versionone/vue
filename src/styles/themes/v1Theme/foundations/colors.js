import {lighten} from 'vue/utilities/colorManipulator';

// # Color definitions

// ## Black, whites, and grays // Examples
export const black = '#000000';
export const white = '#ffffff';
export const transparent = 'rgba(0, 0, 0, 0)';
export const fullBlack = 'rgba(0, 0, 0, 1)';
export const darkBlack = 'rgba(0, 0, 0, 0.87)';
export const lightBlack = 'rgba(0, 0, 0, 0.54)';
export const minBlack = 'rgba(0, 0, 0, 0.26)';
export const faintBlack = 'rgba(0, 0, 0, 0.12)';
export const fullWhite = 'rgba(255, 255, 255, 1)';
export const darkWhite = 'rgba(255, 255, 255, 0.87)';
export const mediumGray = 'rgba(0, 0, 0, 0.298039)';
export const lightWhite = 'rgba(255, 255, 255, 0.5)';

// ## Named Colors
export const aluminum = '#878c94';
export const cerulean = '#00a9e0';
export const forge = '#474c54';
export const gunSmoke = '#31363e';
export const pale = 'dde2e9';
export const shuttle = '#61666e';
export const sunset = '#d52101';
export const lightSunset = lighten(sunset, 0.67);

export const yellowAccent = '#FFF4A3';
