/* eslint no-magic-numbers: off */
import * as Opacity from './Opacity';

function clamp(value, min, max) {
    if (value < min) {
        return min;
    }

    if (value > max) {
        return max;
    }

    return value;
}

const indexIncrement = 1;
const shortRgbHexLength = 4;
const rgbNumberOfValues = 3;
const rgbMarkerIncrement = 1;
const hexColorLength = 2;
const hexStartIndex = 1;
const colorValuesStartIndex = 0;
const colorValuesWithAlphaLength = 4;
const hslPercentDivisor = 100;
const rgbColorNormalizationValue = 255;
const allowedLuminanceDecimalPlaces = 3;
const allowedContrastRatioDecimalPlaces = 2;
const defaultEmphasizeCoefficient = 0.15;
const lightenMin = 0;
const darkenMax = 1;
const getContainsFor = stringToSearch =>
    searchTerm => stringToSearch.indexOf(searchTerm) >= colorValuesStartIndex;

const hasAlpha = values => values.length === colorValuesWithAlphaLength;
const isHex = color => color.indexOf('#') === colorValuesStartIndex;

export const convertColorToString = (color) => {
    const {
        type,
        values
    } = color;
    const contains = getContainsFor(type);

    let colorString;
    if (contains('hsl')) {
        colorString = `${type}(${values[0]},${values[1] * hslPercentDivisor}%,${values[2] * hslPercentDivisor}%`;
    }
    else {
        colorString = `${type}(${values[0]},${values[1]},${values[2]}`;
    }

    if (hasAlpha(values)) {
        colorString += `,${values[3]})`;
    }
    else {
        colorString += ')';
    }

    return colorString;
};

export function convertHexToRGB(color) {
    let expandedColor = color;
    if (color.length === shortRgbHexLength) {
        let extendedColor = '#';
        for (let i = hexStartIndex; i < color.length; i += indexIncrement) {
            extendedColor += color.charAt(i) + color.charAt(i);
        }

        expandedColor = extendedColor;
    }

    const values = [];
    for (let i = hexStartIndex; i < expandedColor.length; i += hexColorLength) {
        values.push(parseInt(expandedColor.substr(i, hexColorLength), 16));
    }

    return `rgb(${values[0]},${values[1]},${values[2]})`;
}

export function decomposeColor(color) {
    let rgbColor = color;
    if (isHex(color)) {
        rgbColor = convertHexToRGB(color);
    }

    const marker = rgbColor.indexOf('(');
    const type = rgbColor.substring(colorValuesStartIndex, marker);
    let values = rgbColor.substring(marker + rgbMarkerIncrement, rgbColor.length - rgbMarkerIncrement).split(',');
    values = values.map(parseFloat);

    if (type === 'hsl') {
        values[1] /= hslPercentDivisor;
        values[2] /= hslPercentDivisor;
    }

    return {
        type,
        values
    };
}

export function getLuminance(colorString) {
    const color = decomposeColor(colorString);
    const contains = getContainsFor(color.type);

    if (contains('rgb')) {
        const rgb = color.values.map((val) => {
            const normalizedValue = val / rgbColorNormalizationValue;
            return normalizedValue <= 0.03928
                ? normalizedValue / 12.92
                : Math.pow((normalizedValue + 0.055) / 1.055, 2.4);
        });
        return Number((0.2126 * rgb[0]) + (0.7152 * rgb[1]) + (0.0722 * rgb[2])
            .toFixed(allowedLuminanceDecimalPlaces));
    }
    return color.values[2];
}

export function getContrastRatio(foreground, background) {
    const lumA = getLuminance(foreground);
    const lumB = getLuminance(background);
    const contrastRatio = (Math.max(lumA, lumB) + 0.05) / (Math.min(lumA, lumB) + 0.05);

    return Number(contrastRatio.toFixed(allowedContrastRatioDecimalPlaces));
}

export function fade(color, value) {
    const {
        type,
        values
    } = decomposeColor(color);
    const clampedValue = clamp(value, Opacity.hidden, Opacity.fullyVisible);

    if (isHex(color)) {
        return convertColorToString({
            type,
            values: values.concat(clampedValue)
        });
    }

    const contains = getContainsFor(type);
    if (contains('rgba')) {
        const newValues = values;
        newValues[3] *= clampedValue;
        return convertColorToString({
            type: `${type}a`,
            values: newValues
        });
    }
    return convertColorToString({
        type: `${type}a`,
        values: values.concat(clampedValue)
    });
}

export function darken(color, coefficient) {
    const {
        type,
        values
    } = decomposeColor(color);
    const clampedCoefficient = clamp(coefficient, lightenMin, darkenMax);
    const contains = getContainsFor(type);

    if (contains('hsl')) {
        values[2] *= 1 - clampedCoefficient;
    }

    else if (contains('rgb')) {
        for (let i = colorValuesStartIndex; i < rgbNumberOfValues; i += indexIncrement) {
            values[i] *= 1 - clampedCoefficient;
        }
    }

    return convertColorToString({
        type,
        values
    });
}

export function lighten(color, coefficient) {
    const {type, values} = decomposeColor(color);
    const clampedCoefficient = clamp(coefficient, lightenMin, darkenMax);
    const contains = getContainsFor(type);

    if (contains('hsl')) {
        values[2] += (1 - color.values[2]) * clampedCoefficient;
    }

    else if (contains('rgb')) {
        for (let i = colorValuesStartIndex; i < rgbNumberOfValues; i += indexIncrement) {
            values[i] += (rgbColorNormalizationValue - color.values[i]) * clampedCoefficient;
        }
    }

    return convertColorToString(color);
}

export function emphasize(color, coefficient = defaultEmphasizeCoefficient) {
    return getLuminance(color) > 0.5
        ? darken(color, coefficient)
        : lighten(color, coefficient);
}

export const changeOpacity = (color, opacity) => {
    const colorValues = decomposeColor(color);
    colorValues.type = 'rgba';
    if (colorValues.values.length > rgbNumberOfValues) {
        colorValues.values[3] = opacity;
    }

    else {
        colorValues.values.push(opacity);
    }

    return convertColorToString(colorValues);
};
