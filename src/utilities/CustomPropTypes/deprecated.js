import warning from 'warning';

const warned = {};
export default (validator, reason) =>
    (props, propName, componentName, location, propFullName, ...args) => {
        const componentNameSafe = componentName || '<<anonymous>>';
        const propFullNameSafe = propFullName || propName;

        if (props[propName] !== null) {
            const messageKey = `${componentName}.${propName}`;

            warning(warned[messageKey],
                `The ${location} \`${propFullNameSafe}\` of \`${componentNameSafe}\` is deprecated. ${reason}`
            );
            warned[messageKey] = true;
        }

        return validator(props, propName, componentName, location, propFullName, ...args);
    };
