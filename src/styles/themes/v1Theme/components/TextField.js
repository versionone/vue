import {white, aluminum, forge, minBlack, pendingBackground, hintText, cerulean} from './../foundations/colors';
import {formFieldFontFamily, formFieldFontSize} from './../foundations/typography';
import {formFieldPadding} from './../foundations/spacing';

export default {
    backgroundColor: white,
    border: `1px solid ${aluminum}`,
    borderRadius: 3,
    fontFamily: formFieldFontFamily,
    fontSize: formFieldFontSize,
    padding: formFieldPadding,
    hintTextColor: hintText,
    textColor: forge,

    // --- states
    disabled: {
        border: `1px solid ${minBlack}`
    },
    focused: {
        boxShadow: `0 0 7px ${cerulean}`
    },
    pending: {
        backgroundColor: pendingBackground
    },
    hasError: {
        boxShadow: `0 0 2px 2px rgba(213, 33, 1, 0.5)`,
        border: '1px solid red'
    }
};