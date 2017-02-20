/* eslint no-magic-numbers: off */
import {darken, getContrastRatio, getLuminance, lighten, toRgbaString} from '@andrew-codes/color-functions';

const defaultEmphasizeCoefficient = 0.15;

export function emphasize(color, coefficient = defaultEmphasizeCoefficient) {
    return getLuminance(color) > 0.5
        ? darken(color, coefficient)
        : lighten(color, coefficient);
}

export function getForegroundForBackground(backgroundColor, foregroundColors = []) {
    return foregroundColors.find((color) => getContrastRatio(color, backgroundColor) >= 11)
        || toRgbaString(emphasize(backgroundColor, 100));
}
