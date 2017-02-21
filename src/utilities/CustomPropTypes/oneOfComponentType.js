import React from 'react';

const lowestMatchingIndex = 0;
const isOneOf = (typeNames) => (name) => typeNames.indexOf(name) >= lowestMatchingIndex;

export default (types) => (props, propName, componentName) => {
    const prop = props[propName];
    const typeNames = types.map((type) => type.displayName);
    const isOneOfTypes = isOneOf(typeNames);
    if (propName !== 'children' && isOneOfTypes(prop.displayName)) {
        return null;
    }
    const typeNamesForError = typeNames.map((name) => `\`${name}\``).join(', ');

    if (propName === 'children') {
        const childrenNames = React.Children.toArray(prop)
            .map((child) => child.type.displayName);
        const hasOnlyValidChildren = childrenNames
            .reduce((output, childName) => output && isOneOfTypes(childName), true);

        if (hasOnlyValidChildren) {
            return null;
        }
        return new Error(`\`${componentName}\` is only allowed children that are one of the following component types: ${typeNamesForError}. Check the render method of \`${componentName}\``);
    }

    return new Error(`\`${componentName}\` prop, \`${propName}\`, should be one of the following component types: ${typeNamesForError}. Check the render method of \`${componentName}\``);
}
;
