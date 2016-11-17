import {PropTypes} from 'react';

const computeZDepths = () => {
    const lowestZDepth = 0;
    const highestZDepth = 5;
    const depthIncrement = 1;
    const zDepths = [];

    for (let depth = lowestZDepth; depth <= highestZDepth; depth += depthIncrement) {
        zDepths.push(depth);
    }
    return zDepths;
};

export default PropTypes.oneOf(computeZDepths());
