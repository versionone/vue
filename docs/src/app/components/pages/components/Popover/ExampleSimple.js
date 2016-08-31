import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'versionone-ui/Popover';

export default class PopoverExampleSimple extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        };
    }

    handleTouchTap = (event) => {
        // This prevents ghost click.
        event.preventDefault();

        this.setState({
            open: true,
            anchorEl: event.currentTarget,
        });
    };

    handleRequestClose = () => {
        this.setState({
            open: false,
        });
    };

    render() {
        return (
            <div>
                <RaisedButton
                    onTouchTap={this.handleTouchTap}
                    label="Click me" />
                <Popover
                    isOpen={this.state.open}
                    anchorElement={this.state.anchorEl}
                    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                    targetOrigin={{horizontal: 'left', vertical: 'top'}}
                    onRequestClose={this.handleRequestClose}>
                    <h3>Content heading</h3>
                    <p>A paragraph of content.</p>
                </Popover>
            </div>
        );
    }
}
