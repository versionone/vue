/* eslint no-magic-numbers: off */
import {darken, getContrastRatio, getLuminance, lighten} from '@andrew-codes/color-functions';

export const emphasize = (color, amount = 0.15) => {
    if (getLuminance(color) > 0.5) {
        return lighten(color, amount);
    }
    return darken(color, amount);
};

export const getForegroundForBackground = (backgroundColor, foregroundColors = ['#ffffff', '#000000']) =>
foregroundColors
    .find(color => getContrastRatio(color, backgroundColor) >= 11)
|| emphasize(backgroundColor, 1);
