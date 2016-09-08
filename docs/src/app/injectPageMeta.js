import React, {Component} from 'react';

export default (pageMeta) => (ComponentForInjection) => class AugmentedComponent extends Component {
    render() {
        return <ComponentForInjection {...pageMeta} />;
    }
}
