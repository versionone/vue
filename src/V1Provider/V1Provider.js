import {Component, PropTypes} from 'react';

class V1Provider extends Component {
    static propTypes = {
        /**
         * Component(s) that are a parent to any child using Vue requiring interactions with V1 instances
         */
        children: PropTypes.node.isRequired,
        /**
         * Instance of the VersionOne JavaScript SDK
         */
        v1: PropTypes.shape({
            query: PropTypes.func.isRequired,
        }).isRequired,
    };

    static
    childContextTypes = {
        v1: PropTypes.shape({
            query: PropTypes.func.isRequired,
        }).isRequired,
    };

    getChildContext() {
        return {
            v1: this.props.v1,
        };
    }

    render() {
        return this.props.children;
    }
}

export default V1Provider;
