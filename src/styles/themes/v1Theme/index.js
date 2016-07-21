import {white, lightWhite, darkBlack, fullBlack, cyan500, cyan700, grey100, grey300, grey500, pinkA200} from './colors';
import {fade} from './../../../utilities/colorManipulator';
import * as spacing from './spacing';
import * as typography from './typography';
import panel from './panel';

export default {
    spacing,
    typography: {
        ...typography,
        fontFamily: `'Proxima Nova', 'Lucida Sans Unicode', 'Lucida Grande', sans-serif`,
        fontStyleLabelFontSize: 16,
        fontStyleButtonFontSize: 16,
        fontStyleTitleFontSizeSmall: 18,
        fontStyleTitleFontSize: 22,
        fontStyleTitleFontSizeLarge: 24
    },
    palette: {
        primary1Color: cyan500,
        primary2Color: cyan700,
        primary3Color: lightWhite,
        accent1Color: pinkA200,
        accent2Color: grey100,
        accent3Color: grey500,
        textColor: darkBlack,
        alternateTextColor: white,
        canvasColor: white,
        borderColor: grey300,
        disabledColor: fade(darkBlack, 0.3),
        shadowColor: fullBlack
    },
    panel
};
