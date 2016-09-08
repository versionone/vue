import React from 'react';
import Popover from 'vue/Popover';

export default class SimpleExample extends React.Component {

    state = {
        isOpen: false
    };

    render() {
        return (
            <div style={{marginBottom: '150px'}}>
                <button
                    onClick={this.handleTouchTap}>Click Me
                </button>
                <Popover
                    isOpen={this.state.isOpen}
                    anchorElement={this.state.anchorEl}
                    onRequestClose={this.handleRequestClose}>
                    <h3>Content heading</h3>
                    <p>A paragraph of content.</p>
                </Popover>
            </div>
        );
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            isOpen: true,
            anchorEl: event.currentTarget
        });
    };

    handleRequestClose = () => {
        this.setState({
            isOpen: false
        });
    };
}