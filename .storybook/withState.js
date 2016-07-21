import React, {Component} from 'react';

export default (storyFn, context) => {
    return <StatefulComponent storyFn={storyFn} storyContext={context} />;
};

class StatefulComponent extends Component {
    constructor(...rest) {
        super(...rest);
        this.state = {};
    }

    render() {
        const {
            storyFn,
            storyContext
        } = this.props;
        storyContext.setState = this.setState.bind(this);
        storyContext.state = this.state;
        return (
            <div>
                {storyFn()}
            </div>
        );
    }
}