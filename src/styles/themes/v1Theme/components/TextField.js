import {white, lightBlack, minBlack, black, pendingBackground, hintText} from './../colors';
import {formFieldFontFamily} from './../typography';

export default {
    backgroundColor: white,
    border: `1px solid ${lightBlack}`,
    borderRadius: 5,
    fontFamily: formFieldFontFamily,
    fontSize: 16,
    height: 48,
    hintTextColor: hintText,
    textColor: black,

    // --- states
    disabled: {
        border: `1px solid ${minBlack}`
    },
    focused: {
        border: '1px solid blue'
    },
    pending: {
        backgroundColor: pendingBackground
    }
};