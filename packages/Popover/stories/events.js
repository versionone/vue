import React, {Component} from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import Popover from './../src';

storiesOf('Popover')
    .add('events', () => (
            <div style={{
                textAlign: 'center',
            }}
            >
                <p>Click anchors to toggle popovers</p>
                <PopoverDemo />
            </div>
        )
    );

class PopoverDemo extends Component {
    constructor(...rest) {
        super(...rest);
        this.state = {
            open: false
        };
    }

    componentDidMount() {
        this.setState({
            open: true,
        });
    }

    render() {
        const {
            open,
        } = this.state;
        return (
            <div>
                <span
                    ref={(el) => {
                        this.anchor = el;
                    }}
                >
                    Anchor
                </span>
                <Popover
                    anchorElement={this.anchor}
                    anchorOrigin={{
                        horizontal: 'center',
                        vertical: 'bottom'
                    }}
                    open={open}
                    targetOrigin={{
                        horizontal: 'center',
                        vertical: 'top'
                    }}
                    onRequestClose={action('onRequestClose')}
                >
                    <div style={{
                        backgroundColor: 'white',
                    }}>
                        {(new Array(7).fill(1)).map((item, index) => (
                            <div key={index}>Item {index}</div>
                        ))}
                    </div>
                </Popover>
            </div>
        );
    }
}
