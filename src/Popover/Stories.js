import React, {Component, PropTypes} from 'react';
import {storiesOf} from '@kadira/storybook';
import Popover from './';

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
        this.setState({open: !this.state.open});
    }

    closePopover() {
        this.setState({open: false});
    }

    render() {
        const {anchorOrigin, targetOrigin} = this.props;
        const {open} = this.state;
        return (
            <div>
                <span
                    ref={(el) => {
                        this.anchor = el;
                    }}
                    onClick={this.handleClick}
                >Anchor</span>
                <Popover
                    anchorElement={this.anchor}
                    anchorOrigin={anchorOrigin}
                    open={open}
                    targetOrigin={targetOrigin}
                    onRequestClose={this.closePopover}
                >
                    Hello world
                </Popover>
            </div>
        );
    }
}

storiesOf('Popover')
    .addWithInfo('opens to the right, middle',
        ``,
        () => (
            <PopoverDemo
                anchorOrigin={{
                    horizontal: 'right',
                    vertical: 'middle'
                }}
                targetOrigin={{
                    horizontal: 'left',
                    vertical: 'middle'
                }}
            />
        )
    )
    .addWithInfo('opens to the center top',
        ``,
        () => (
            <PopoverDemo
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'top'
                }}
                targetOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}
            />
        )
    )
    .addWithInfo('opens to the left, middle',
        ``,
        () => (
            <div style={{textAlign: 'right'}}>
                <PopoverDemo
                    anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'middle'
                    }}
                    targetOrigin={{
                        horizontal: 'right',
                        vertical: 'middle'
                    }}
                />
            </div>
        )
    )
    .addWithInfo('opens center, bottom',
        ``,
        () => (
            <PopoverDemo
                anchorOrigin={{
                    horizontal: 'center',
                    vertical: 'bottom'
                }}
                targetOrigin={{
                    horizontal: 'center',
                    vertical: 'top'
                }}
            />
        )
    );
