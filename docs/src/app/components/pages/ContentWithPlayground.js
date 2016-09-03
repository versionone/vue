import React, {Component, PropTypes} from 'react';
import PlaygroundDrawer from './../Playground';

class ContentPage extends Component {
    static propTypes = {
        children: PropTypes.node,
        style: PropTypes.object
    };

    state = {
        code: '',
        isOpen: false
    };

    render() {
        const {children} = this.props;
        const {code, isOpen} = this.state;
        return (
            <div>
                <PlaygroundDrawer ref="playground" open={isOpen} docked={true}
                            onRequestChange={(isOpen) => this.setState({isOpen: false})} />
                {React.Children.map(children, (child)=> React.cloneElement(child, {
                    openPlayground: this.openPlayground
                }))}

            </div>
        );
    }

    openPlayground = (code) => {
        this.setState({isOpen: true});
        this.refs.playground.loadCode(code);
    }
}

export default ContentPage;