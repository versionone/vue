import React, {Component, PropTypes} from 'react';

class Components extends Component {
    static meta = {
        title: 'Components'
    };

    static propTypes = {};

    static defaultProps = {};

    constructor(props, ...rest) {
        super(props, ...rest);
    }

    render() {
        return (
            <span>Components</span>
        );
    }
}

export default Components;