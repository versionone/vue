import invariant from 'warning';

export const CALLED_ONCE = 'themePrepared';

export default function callOnce() {
    if (process.env.NODE_ENV !== 'production') {
        return (style) => {
            invariant(!style[CALLED_ONCE], 'You cannot call prepareStyles() on the same style object more than once.');
            style[CALLED_ONCE] = true;
            return style;
        };
    }
}
