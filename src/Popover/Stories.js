import React, {Component, PropTypes} from 'react';
import {storiesOf} from '@kadira/storybook';
import Popover from './';

class PopoverDemo extends Component {
    static defaultProps = {
        showContent: false,
    };

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
        const {
            anchorOrigin,
            showContent,
            targetOrigin,
        } = this.props;
        const {
            open,
        } = this.state;
        return (
            <div>
                <span
                    ref={(el) => {
                        this.anchor = el;
                    }}
                    onClick={this.handleClick}
                >Anchor</span>
                {showContent && <div>This is content that the popover can render over.</div>}
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
    .addWithInfo('simple popover over content',
        ``,
        () => (
            <div style={{
                textAlign: 'center',
            }}
            >
                <PopoverDemo
                    anchorOrigin={{
                        horizontal: 'center',
                        vertical: 'bottom'
                    }}
                    showContent
                    targetOrigin={{
                        horizontal: 'center',
                        vertical: 'top'
                    }}
                />
            </div>
        )
    )
    .addWithInfo('too far left, top',
        ``,
        () => (
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
        )
    )
    .addWithInfo('too far left, on top of anchor',
        ``,
        () => (
            <PopoverDemo
                anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'middle',
                }}
                targetOrigin={{
                    horizontal: 'right',
                    vertical: 'middle',
                }}
            />
        )
    )
    .addWithInfo('too far right, top',
        ``,
        () => (
            <div style={{
                float: 'right',
                textAlign: 'right',
            }}>
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
        )
    )
    .addWithInfo('too far right, on top of anchor',
        ``,
        () => (<div style={{
                float: 'right',
                textAlign: 'right',
            }}>
                <PopoverDemo
                    anchorOrigin={{
                        horizontal: 'right',
                        vertical: 'middle',
                    }}
                    targetOrigin={{
                        horizontal: 'left',
                        vertical: 'middle',
                    }}
                />
            </div>
        )
    )
    .addWithInfo('too far below, on right',
        ``,
        () => (
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
        )
    )
    .addWithInfo('too far below, on top of anchor',
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
