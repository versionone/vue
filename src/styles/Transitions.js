export const easeOutFunction = 'cubic-bezier(0.23, 1, 0.32, 1)';
export const easeInOutFunction = 'cubic-bezier(0.445, 0.05, 0.55, 0.95)';

export const easeOut = (duration, property, delay, easeFunction) => {
    easeFunction = easeFunction || easeOutFunction;

    let properties = property;
    if (!property || Object.prototype.toString.call(property) !== '[object Array]') {
        properties = [property];
    }

    return properties
        .reduce((transitionStyles, prop) => transitionStyles.concat(create(duration, prop, delay, easeFunction)), [])
        .join(',');
};

export const create = (duration, property, delay, easeFunction)=> {
    duration = duration || '450ms';
    property = property || 'all';
    delay = delay || '0ms';
    easeFunction = easeFunction || 'linear';

    return `${property} ${duration} ${easeFunction} ${delay}`;
};
