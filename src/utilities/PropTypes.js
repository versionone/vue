import React, {PropTypes} from 'react';
import stylePropType from 'react-style-proptype';
import {CALLED_ONCE} from './callOnce';

export const style = (props, propName, componentName) => {
    delete props[propName][CALLED_ONCE];
    return stylePropType(props, propName, componentName);
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
    const typeNamesForError = typeNames.map((name)=> `\`${name}\``).join(', ');
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