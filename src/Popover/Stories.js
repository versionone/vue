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
                <div>This is content that the popover can render over.</div>
                <Popover
                    anchorElement={this.anchor}
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

storiesOf('Popover')
    .addWithInfo('renders horizontally within viewport',
        ``,
        () => (
            <div>
                <div>
                    <p>Normally would render above and to the center of the anchor; however it should auto-adjusts by
                       moving it to the right to ensure it is within the viewport.</p>
                    <PopoverDemo
                        anchorOrigin={{
                            horizontal: 'left',
                            vertical: 'top',
                        }}
                        targetOrigin={{
                            horizontal: 'right',
                            vertical: 'bottom',
                        }}
                    />
                </div>
                <hr />
                <div>
                    <p>Normally would render above and to the center of the anchor; however it should auto-adjusts by
                       moving it to the left to ensure it is within the viewport.</p>
                    <div style={{
                        float: 'right',
                        textAlign: 'right',
                    }}
                    >
                        <PopoverDemo
                            anchorOrigin={{
                                horizontal: 'right',
                                vertical: 'top',
                            }}
                            targetOrigin={{
                                horizontal: 'left',
                                vertical: 'bottom',
                            }}
                        />
                    </div>
                </div>
            </div>
        )
    )
    .addWithInfo('renders vertically within viewport',
        ``,
        () => (
            <div>
                <p>Should render to the bottom right of the anchor, but it auto-adjusts vertically to ensure it is
                   within the viewport.</p>
                <PopoverDemo
                    anchorOrigin={{
                        horizontal: 'right',
                        vertical: 'bottom'
                    }}
                    targetOrigin={{
                        horizontal: 'left',
                        vertical: 'top'
                    }}
                />
            </div>
        )
    )
    .addWithInfo('opens on top of content',
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
