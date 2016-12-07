import React from 'react';

export default type => (props, propName, componentName) => {
    const prop = props[propName];
    let error;
    if (propName === 'children') {
        let error = null;
        React.Children.forEach(prop, (el) => {
            if (error) {
                return;
            }
            if (el.type.displayName !== type.displayName) {
                error = new Error(`\`${componentName}\` is only allowed children that are \`${type.displayName}\` components. Check the render method of \`${componentName}\``);
            }
        });
        return error;
    }
    if (prop.displayName !== type.displayName) {
        return new Error(`\`${componentName}\` prop, \`${propName}\`, should be a \`${type.displayName}\` component. Check the render method of \`${componentName}\``);
    }

    return null;
};
