import React from 'react';
import {getDisplayName} from './../component';

export default (type) => (props, propName, componentName) => {
    const prop = props[propName];
    const typeName = getDisplayName(type);
    if (propName === 'children') {
        let error = null;
        React.Children.forEach(prop, (el) => {
            if (error) {
                return;
            }
            if (getDisplayName(el.type) !== typeName) {
                error = new Error(`\`${componentName}\` is only allowed children that are \`${type.displayName}\` components. Check the render method of \`${componentName}\``);
            }
        });
        return error;
    }
    if (getDisplayName(prop) !== typeName) {
        return new Error(`\`${componentName}\` prop, \`${propName}\`, should be a \`${type.displayName}\` component. Check the render method of \`${componentName}\``);
    }

    return null;
};
