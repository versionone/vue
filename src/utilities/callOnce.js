import invariant from 'invariant';

const CALLED_ONCE = 'themePrepared';

export default function callOnce() {
    if (process.env.NODE_ENV !== 'production') {
        return (style) => {
            if (style[CALLED_ONCE]) {
                invariant(false, 'You cannot call prepareStyles() on the same style object more than once.');
            }
            style[CALLED_ONCE] = true;
            return style;
        };
    }
}
