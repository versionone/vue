import React, {Component} from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import Popover from './../src';

storiesOf('Popover')
    .add('exceeds vertical space', () => (
            <PopoverExceedsVerticalSpace
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'top',
                }}
                targetOrigin={{
                    horizontal: 'left',
                    vertical: 'top',
                }}
            />
        )
    );

class PopoverExceedsVerticalSpace extends Component {
    constructor(...rest) {
        super(...rest);
        this.state = {
            open: false,
        };
        this.handleClick = this.handleClick.bind(this);
        this.closePopover = this.closePopover.bind(this);
    }

    handleClick() {
        this.setState({open: !this.state.open});
    }

    closePopover(...rest) {
        action('onRequestClose')(...rest);
        this.setState({open: false});
    }

    render() {
        const {
            anchorOrigin,
            targetOrigin,
        } = this.props;
        const {
            open
        } = this.state;
        return (
            <div>
                {(new Array(10).fill(1)).map((item, index) => (
                    <div key={`beforefiller-${index}`}>Filler {index}</div>
                ))}
                <strong
                    ref={(el) => {
                        this.anchor = el;
                    }}
                    onClick={this.handleClick}
                >
                    Anchor
                </strong>
                {(new Array(100).fill(1)).map((item, index) => (
                    <div key={`afterfiller-${index}`}>Filler {index}</div>
                ))}
                <Popover
                    anchorElement={this.anchor}
                    anchorOrigin={anchorOrigin}
                    open={open}
                    targetOrigin={targetOrigin}
                    onRequestClose={this.closePopover}
                >
                    <div
                        style={{
                            background: 'white',
                            border: '1px solid gray',
                        }}
                    >
                        {(new Array(100).fill(1)).map((item, index) => (
                            <div
                                key={index}
                                style={{
                                    alignItems: 'center',
                                    alignSelf: 'stretch',
                                    backgroundColor: 'white',
                                    display: 'flex',
                                }}
                            >
                                <div
                                    style={{
                                        flex: '1 1 auto'
                                    }}>
                                    Item{index}
                                </div>
                                <div style={{
                                    display: 'inline-flex',
                                }}
                                >
                                    {'>'}
                                </div>
                            </div>
                        ))}
                    </div>
                </Popover>
            </div>
        );
    }
}
