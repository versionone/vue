import React, {Component} from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import Popover from './../src';

storiesOf('Popover')
    .add('positioning', () => (
            <div style={{
                textAlign: 'center',
            }}
            >
                <p>Click anchors to toggle popovers</p>
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
    );

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
                {showContent && (
                    <div>
                        This is content. It is very nice.
                    </div>
                )}
                <span
                    ref={(el) => {
                        this.anchor = el;
                    }}
                    onClick={this.handleClick}
                >Anchor</span>
                {showContent && (
                    <div>
                        This is content. It is very nice.
                    </div>
                )}
                <Popover
                    anchorElement={this.anchor}
                    anchorOrigin={anchorOrigin}
                    open={open}
                    targetOrigin={targetOrigin}
                    onRequestClose={this.closePopover}
                >
                    <div style={{backgroundColor: 'white'}}>
                        {(new Array(7).fill(1)).map((item, index) => (
                            <div key={index}>Item {index}</div>
                        ))}
                    </div>
                </Popover>
            </div>
        );
    }
}
