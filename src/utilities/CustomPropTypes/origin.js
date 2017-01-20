import {PropTypes} from 'react';

const horizontal = PropTypes.oneOf(['left', 'center', 'right']);
const vertical = PropTypes.oneOf(['top', 'middle', 'bottom']);

export default PropTypes.shape({
    horizontal: horizontal.isRequired,
    vertical: vertical.isRequired
});
