import React, {PropTypes, Component} from 'react';

export default () => (ComponentToAugment) => class extends Component {
    static contextTypes = {
        window: PropTypes.object.isRequired
    };

    render() {
        return (
            <ComponentToAugment {...this.props} window={this.context.window} />
        );
    }
};