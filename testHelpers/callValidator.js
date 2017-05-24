import ReactPropTypesArgs from './reactPropTypeArgs';

const callValidator = (validator, element, propName = '', componentName = '') => validator(element.props, propName, componentName, ...ReactPropTypesArgs);

export const validatorPasses = (validator, element, propName) => callValidator(validator, element, propName) === null;
export const validatorFails = (validator, element, propName) => callValidator(validator, element, propName) instanceof Error;
