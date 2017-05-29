import React, {Component} from 'react';
import {action} from '@storybook/addon-actions';
import {storiesOf} from '@storybook/react';
import Popover from './../src';

storiesOf('Popover')
    .add('dynamically changing popover horizontal size', () => (
            <PopoverDynamicallyChangingSize
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

class PopoverDynamicallyChangingSize extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            longContent: '',
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            longContent: Boolean(this.state.longContent) ? '' : 'rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz'
        });
    }

    render() {
        const {
            longContent,
        } = this.state;

        return (
            <div>
                <span
                    ref={(el) => {
                        this.anchor = el;
                    }}
                    onClick={this.handleClick}
                >
                   Toggle longer content
                </span>
                <Popover
                    anchorElement={this.anchor}
                    anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'bottom'
                    }}
                    open
                    targetOrigin={{
                        horizontal: 'left',
                        vertical: 'top'
                    }}
                    onRequestClose={action('onRequestClose')}
                >
                    <div style={{
                        background: 'white',
                        border: '1px solid gray',
                        minWidth: '100px',
                    }}
                    >
                        <div style={{
                            alignItems: 'center',
                            alignSelf: 'stretch',
                            display: 'flex',
                        }}
                        >
                            <span style={{
                                flex: 'auto',
                            }}
                            >
                                short content
                            </span>
                        </div>
                        {Boolean(longContent) && (
                            <div style={{
                                alignItems: 'center',
                                alignSelf: 'stretch',
                                display: 'flex',
                            }}
                            >
                            <span style={{
                                flex: 'auto',
                            }}
                            >
                                {longContent}
                            </span>
                            </div>
                        )}
                    </div>
                </Popover>
            </div>
        );
    }
}
