import {Component, PropTypes} from 'react';

class V1Provider extends Component {
    static propTypes = {
        /**
         * Query function used to resolve meta queries to hydrated asset item data
         */
        runQuery: PropTypes.func.isRequired,
    };

    static
    childContextTypes = {
        runQuery: PropTypes.func.isRequired,
    };

    getChildContext() {
        return {
            runQuery: this.props.runQuery,
        };
    }

    render() {
        return this.props.children;
    }
}

export default V1Provider;
