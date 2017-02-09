import React, {Component} from 'react';
import Popover, {Positions} from 'vue/Popover';

export default () => (
    <div>
        <HoverTooltipExample />
    </div>
);

class HoverTooltip extends Component {
    state = {
        open: false
    };

    render() {
        return (
            <span>
                <span
                    ref={(el) => this.anchor = el}
                    onMouseEnter={() => this.setState({open: true})}
                    onMouseLeave={() => this.setState({open: false})}
                >
                    {this.props.text}</span>
                <Popover
                    anchorElement={this.anchor}
                    anchorOrigin={this.props.anchorOrigin}
                    autoCloseWhenOffScreen
                    open={this.state.open}
                    targetOrigin={this.props.targetOrigin}
                    onRequestClose={() => this.setState({open: false})}
                >
                    {this.props.children}
                </Popover>
            </span>
        );
    }
}

class HoverTooltipExample extends Component {
    render() {
        const hoverContentStyle = {
            background: 'lightblue',
            margin: 0,
        };
        return (
            <div style={{margin: '1em'}}>
                <HoverTooltip
                    anchorOrigin={{
                        horizontal: Positions.left,
                        vertical: Positions.bottom,
                    }}
                    targetOrigin={{
                        horizontal: Positions.right,
                        vertical: Positions.top,
                    }}
                    text="My hover is to the bottom left of me"
                >
                    <p
                        style={hoverContentStyle}
                    >
                        Hover boards are cool!</p>
                </HoverTooltip>
                <HoverTooltip
                    anchorOrigin={{
                        horizontal: Positions.center,
                        vertical: Positions.bottom,
                    }}
                    targetOrigin={{
                        horizontal: Positions.center,
                        vertical: Positions.top,
                    }}
                    text="My hover is to the bottom center of me"
                >
                    <p
                        style={hoverContentStyle}
                    >
                        Hover boards are cool!</p>
                </HoverTooltip>
                <HoverTooltip
                    anchorOrigin={{
                        horizontal: Positions.center,
                        vertical: Positions.top,
                    }}
                    targetOrigin={{
                        horizontal: Positions.center,
                        vertical: Positions.bottom,
                    }}
                    text="My hover is to the top center of me"
                >
                    <p
                        style={hoverContentStyle}
                    >
                        Hover boards are cool!</p>
                </HoverTooltip>
            </div>
        );
    }
}
