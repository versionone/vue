import React, {PropTypes} from 'react';
import validCssStyles from './validCssStyles';
import {CALLED_ONCE} from './callOnce';
import warning from 'warning';

export const style = (props, propName, componentName) => {
    delete props[propName][CALLED_ONCE];
    const styles = props[propName];

    if (!styles) {
        return;
    }
    const failures = Object.keys(styles).reduce((output, key) => {
        if (validCssStyles.indexOf(key) < 0) {
            output.push(key)
        }
        return output;
    }, []);
    if (failures.length) {
        throw new Error('Prop ' + propName + ' passed to ' + componentName + '. Has invalid keys ' + failures.join(', '));
    }
};

module.exports.isRequired = function(props, propName, componentName) {
    if (!props[propName]) {
        throw new Error('Prop ' + propName + ' passed to ' + componentName + ' is required');
    }
    return module.exports(props, propName, componentName);
};

export const componentType = (type) => (props, propName, componentName) => {
    const prop = props[propName];
    let error;
    if (propName === 'children') {
        React.Children.forEach(prop, (el) => {
            if (error) {
                return;
            }
            if (el.type.name !== type.name) {
                error = new Error(`\`${componentName}\` is only allowed children that are \`${type.name}\` components. Check the render method of \`${componentName}\``);
            }
        });
        return error;
    }
    if (prop.name === type.name) {
        return;
    }
    return new Error(`\`${componentName}\` prop, \`${propName}\`, should be a \`${type.name}\` component. Check the render method of \`${componentName}\``);
};

export const oneOfComponentType = (types) => (props, propName, componentName) => {
    const prop = props[propName];
    const typeNames = types.map((type) => type.name);
    const typeNamesForError = typeNames.map((name) => `\`${name}\``).join(', ');
    if (propName === 'children') {
        const childrenNames = React.Children.toArray(prop).map((child) => child.type.name);
        for (var index = 0; index < childrenNames.length; index++) {
            if (typeNames.indexOf(childrenNames[index]) < 0) {
                return new Error(`\`${componentName}\` is only allowed children that are one of the following component types: ${typeNamesForError}. Check the render method of \`${componentName}\``);
            }
        }
        return;
    }
    if (typeNames.indexOf(prop.name) < 0) {
        return new Error(`\`${componentName}\` prop, \`prop\`, should be one of the following component types: ${typeNamesForError}. Check the render method of \`${componentName}\``);
    }
};

const horizontal = PropTypes.oneOf(['left', 'middle', 'right']);
const vertical = PropTypes.oneOf(['top', 'center', 'bottom']);

export const origin = PropTypes.shape({
    horizontal,
    vertical
});

export const zDepth = PropTypes.oneOf([0, 1, 2, 3, 4, 5]);

export const theme = PropTypes.shape({
    prepareStyles: PropTypes.func.isRequired
});

export const font = PropTypes.shape({
    fontWeight: PropTypes.number,
    fontStyle: PropTypes.string,
    fontFamily: PropTypes.oneOf([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ])
});

let warned = {};
export const deprecated = (validator, reason) => (props, propName, componentName, location, propFullName, ...args) => {
    const componentNameSafe = componentName || '<<anonymous>>';
    const propFullNameSafe = propFullName || propName;

    if (props[propName] != null) {
        const messageKey = `${componentName}.${propName}`;

        warning(warned[messageKey],
            `The ${location} \`${propFullNameSafe}\` of ` +
            `\`${componentNameSafe}\` is deprecated. ${reason}`
        );

        warned[messageKey] = true;
    }

    return validator(props, propName, componentName, location, propFullName, ...args);
};