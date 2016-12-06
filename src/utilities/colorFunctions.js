/* eslint no-magic-numbers: off */
import {
    darken as darkenFn,
    desaturate as desaturateFn,
    getContrastRatio,
    getLuminance,
    lighten as lightenFn,
    saturate as saturateFn,
    setOpacity as setOpacityFn,
    shade as shadeFn,
    tint as tintFn,
    toRgba,
    toRgbaString
} from '@andrew-codes/color-functions';

export const setOpacity = (color, opacity) => toRgbaString(setOpacityFn(color, opacity));
export const darken = (color, amount) => toRgbaString(darkenFn(color, amount));
export const lighten = (color, amount) => toRgbaString(lightenFn(color, amount));
export const shade = (color, amount) => toRgbaString(shadeFn(color, amount));
export const tint = (color, amount) => toRgbaString(tintFn(color, amount));
export const saturate = (color, amount) => toRgbaString(saturateFn(color, amount));
export const desaturate = (color, amount) => toRgbaString(desaturateFn(color, amount));

export const emphasize = (color, amount = 0.15) => {
    if (getLuminance(color) > 0.5) {
        return lighten(color, amount);
    }
    return darken(color, amount);
};

export const getForegroundForBackground = (backgroundColor, foregroundColors = ['#ffffff', '#000000']) => toRgbaString(
    foregroundColors
        .map((foregroundColor) => {
            try {
                return toRgba(foregroundColor);
            }
            catch (error) {
                return null;
            }
        })
        .filter(color => !!color)
        .find(color => getContrastRatio(color, backgroundColor) >= 11)
);
