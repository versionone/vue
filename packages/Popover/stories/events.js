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
            <div style={{
                border: '1px solid lightblue',
                padding: '6px',
            }}
            >
                <strong
                    ref={(el) => {
                        this.anchor = el;
                    }}
                >
                    Anchor (with open popover)
                </strong>
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
                        background: 'white',
                        border: '1px solid gray',
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
