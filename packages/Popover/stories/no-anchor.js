import React, {Component} from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import Popover from './../src';

storiesOf('Popover')
    .add('no anchor element', () => (
            <div style={{
                textAlign: 'center',
            }}
            >
                <PopoverDemoWithoutAnchor />
            </div>
        )
    );

class PopoverDemoWithoutAnchor extends Component {
    constructor(...rest) {
        super(...rest);
        this.state = {
            open: false
        };
        this.handleClick = this.handleClick.bind(this);
        this.closePopover = this.closePopover.bind(this);
    }

    handleClick() {
        this.setState({
            open: !this.state.open,
        });
    }

    closePopover(...rest) {
        action('onRequestClose')(...rest);
        this.setState({
            open: false,
        });
    }

    render() {
        const {
            anchorOrigin,
            targetOrigin,
        } = this.props;
        const {
            open,
        } = this.state;

        var div = document.createElement("div");
        div.setAttribute("class", "a-class");
        return (
            <div>
                <p>
                    The popover should not open when there is no anchor. Click below to attempt to open the popover.
                </p>
                <strong
                    onClick={this.handleClick}
                >
                    Click to open.
                </strong>
                <Popover
                    anchorElement={document.createElement("div")}
                    anchorOrigin={anchorOrigin}
                    open={open}
                    targetOrigin={targetOrigin}
                    onRequestClose={this.closePopover}
                >
                    <div style={{backgroundColor: 'white'}}>
                        This is the contents of the popover.
                    </div>
                </Popover>
            </div>
        );
    }
}
