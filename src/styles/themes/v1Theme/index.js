import {white, darkBlack, fullBlack} from './../../colors';
import {cyan500, cyan700, grey100, grey300, grey400, grey500, pinkA200} from './colors';
import {fade} from './../../../utilities/colorManipulator';
import * as spacing from './spacing';

export default {
    spacing,
    font: {
        fontFamily: 'Roboto, sans-serif',
        fontStyleLabelFontSize: 18,
        fontStyleButtonFontSize: 14
    },
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: grey400,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        shadowColor: fullBlack
    }
};
