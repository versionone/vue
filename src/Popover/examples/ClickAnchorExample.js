import React, {Component} from 'react';
import Popover, {Positions} from 'vue/Popover';

export default () => (
    <div>
        <TooltipExample>
            <h3>Title</h3>
            <p>I could be a Tooltip without any styling!</p>
            <p>Just use your imagination!</p>
        </TooltipExample>
    </div>
);

class TooltipExample extends Component {
    state = {
        open: false
    };

    render() {
        return (
            <div style={{margin: '1em'}}>
                <p>Click the example <strong
                    ref={(el) => this.anchor = el}
                    style={{
                        background: '#ccc',
                    }}
                    onClick={() => this.setState({open: true})}
                >
                    anchor point
                </strong>.
                </p>
                <Popover
                    anchorElement={this.anchor}
                    anchorOrigin={{
                        horizontal: Positions.right,
                        vertical: Positions.top,
                    }}
                    autoCloseWhenOffScreen
                    open={this.state.open}
                    targetOrigin={{
                        horizontal: Positions.left,
                        vertical: Positions.top,
                    }}
                    onRequestClose={() => this.setState({open: false})}
                >
                    <div
                        style={{
                            background: '#3c4b5a',
                            color: '#fff',
                        }}
                    >
                    {this.props.children}

                    </div>
                </Popover>
            </div>
        );
    }
}
