import React, {Component} from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import Popover from './../src';

const horizontalPositions = [
    'left',
    'center',
    'right',
];
const verticalPositions = [
    'top',
    'middle',
    'bottom',
];

storiesOf('Popover')
    .add('positioning', () => (
            <div style={{
                textAlign: 'center',
            }}
            >
                <h2>Click anchors to toggle popovers</h2>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    textAlign: 'center',
                }}
                >
                    {horizontalPositions.map((aHPosition, hIndex) =>
                        verticalPositions.map((aVPosition, vIndex) => (
                            horizontalPositions.map((tHPosition, hIndex) =>
                                verticalPositions.map((tVPosition, vIndex) => (
                                    <PopoverDemo
                                        anchorOrigin={{
                                            horizontal: aHPosition,
                                            vertical: aVPosition
                                        }}
                                        targetOrigin={{
                                            horizontal: tHPosition,
                                            vertical: tVPosition,
                                        }}
                                    />
                                ))
                            ))
                        ))
                    }
                </div>
            </div>
        )
    );

class PopoverDemo extends Component {
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

    closePopover(e, ...rest) {
        action('onRequestClose')(e, ...rest);
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
        return (
            <div
                style={{
                    border: '1px solid lightblue',
                    flex: '1 1 auto',
                    padding: '6px',
                    margin: '6px',
                }}
            >
                <p>
                    <strong>Popover Positioning</strong><br />
                    anchor origin: {anchorOrigin.vertical} {anchorOrigin.horizontal}<br />
                    target origin: {targetOrigin.vertical} {targetOrigin.horizontal}
                </p>
                <strong
                    ref={(el) => {
                        this.anchor = el;
                    }}
                    onClick={this.handleClick}
                >
                    Anchor Text
                </strong>
                <div>
                    This is content below the anchor. It is very nice.
                </div>
                <Popover
                    anchorElement={this.anchor}
                    anchorOrigin={anchorOrigin}
                    open={open}
                    targetOrigin={targetOrigin}
                    onRequestClose={this.closePopover}
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
