import {white, lightBlack, pendingBackgroundColor} from './../colors';
import {desktopGutterMini} from './../spacing';

export default {
    backgroundColor: white,
    padding: desktopGutterMini,
    border: `1px solid ${lightBlack}`,
    borderRadius: 5,
    focused: {
        outline: '1px solid blue'
    },
    pending: {
        backgroundColor: pendingBackgroundColor
    }
};