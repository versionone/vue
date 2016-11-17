import React from 'react';

export default type => (props, propName, componentName) => {
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
    if (prop.name !== type.name) {
        return new Error(`\`${componentName}\` prop, \`${propName}\`, should be a \`${type.name}\` component. Check the render method of \`${componentName}\``);
    }

    return null;
};
