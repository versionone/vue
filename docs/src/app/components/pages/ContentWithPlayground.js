import React, {Component, PropTypes} from 'react';
import Playground from './../Playground';

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
                <Playground code={code} open={isOpen} docked={true}
                            onRequestChange={(isOpen) => this.setState({isOpen: false})} />
                {React.Children.map(children, (child)=> React.cloneElement(child, {
                    openPlayground: this.openPlayground
                }))}

            </div>
        );
    }

    openPlayground = (code) => this.setState({code, isOpen: true});
}

export default ContentPage;