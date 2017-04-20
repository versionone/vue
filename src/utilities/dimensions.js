import strip from 'css-strip-units';
export const getUnit = strip;
export const getValue = (value) => parseFloat(value.replace(strip(value), ''));
