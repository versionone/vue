export const getDisplayName = (WrappedComponent) => {
    return WrappedComponent.displayName
        || WrappedComponent.name
        || 'Component';
};

const doNothingHandler = () => () => null;
export const createEventHandler = (handler, ...rest) => evt => handler(evt, ...rest);
export const createConditionalEventHandler = (condition) => {
    if (condition) {
        return createEventHandler;
    }
    return doNothingHandler;
};
export const createEventHandlerIgnoringEventData = (handler, ...rest) => () => handler(...rest);
