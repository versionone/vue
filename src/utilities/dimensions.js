import strip from 'css-strip-units';

export const getUnit = (value) => {
    if (!value) {
        throw new Error('Value is null or undefined');
    }
    return strip(value);
};

export const getValue = (value) => {
    if (!value) {
        throw new Error('Value is null or undefined');
    }
    return parseFloat(value.replace(strip(value), ''));
};
