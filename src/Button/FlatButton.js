import React, {Component, PropTypes} from 'react';

class FlatButton extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired
    };

    static defaultProps = {};

    constructor(props, ...rest) {
        super(props, ...rest);
    }

    render() {
        const {
            text
        } = this.props;
        return (
            <button>{text}</button>
        );
    }
}

export default FlatButton;