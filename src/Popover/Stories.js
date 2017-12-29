import React, {Component} from 'react';
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
                        {(new Array(7).fill(1)).map((item, index) => (
                            <div key={index}>Item {index}</div>
                        ))}
                    </div>
                </Popover>
            </div>
        );
    }
}

class PopoverDemoWithLongTextWidth extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            newItem: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.setState({
            newItem: true,
        });
    }

    render() {
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
                    anchorOrigin={{
                        horizontal: 'left',
                        vertical: 'bottom'
                    }}
                    open
                    targetOrigin={{
                        horizontal: 'left',
                        vertical: 'top'
                    }}
                >
                    <div style={{
                        background: 'white',
                        minWidth: '100px',
                    }}>
                        <div style={{
                            alignItems: 'center',
                            alignSelf: 'stretch',
                            display: 'flex',
                        }}>
                            <span style={{
                                flex: 'auto',
                            }}>
                            rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetz
                            </span>
                        </div>
                        {this.state.newItem && (
                            <div style={{
                                alignItems: 'center',
                                alignSelf: 'stretch',
                                display: 'flex',
                            }}>
                                <span style={{
                                    flex: 'auto',
                                }}>
                                    rindfleischetikettierungsüberwachungsaufgabenübertragungsgesetzGetOffMyLawnYouYoungWhipperSnappers
                                </span>
                            </div>
                        )}
                    </div>
                </Popover>
            </div>
        );
    }
}

class PopoverDemoWithManyMenuItems extends Component {
    static defaultProps = {
        autoCloseWhenOffScreen: true,
    };

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

    closePopover() {
        this.setState({open: false});
    }

    render() {
        const {
            anchorOrigin,
            autoCloseWhenOffScreen,
            targetOrigin,
        } = this.props;
        const {
            open
        } = this.state;
        return (
            <div>
                {(new Array(10).fill(1)).map((item, index) => (
                    <div key={"beforefiller" + index}>Filler {index}</div>
                ))}
                <span
                    ref={(el) => {
                        this.anchor = el;
                    }}
                    onClick={this.handleClick}
                >Anchor</span>
                {(new Array(100).fill(1)).map((item, index) => (
                    <div key={"afterfiller" + index}>Filler {index}</div>
                ))}
                <Popover
                    autoCloseWhenOffScreen={autoCloseWhenOffScreen}
                    anchorElement={this.anchor}
                    anchorOrigin={anchorOrigin}
                    open={open}
                    targetOrigin={targetOrigin}
                    onRequestClose={this.closePopover}
                >
                    {(new Array(100).fill(1)).map((item, index) => (
                        <div
                            key={index}
                            style={{
                                alignItems: 'center',
                                alignSelf: 'stretch',
                                backgroundColor: 'white',
                                display: 'flex',
                            }}>
                            <div
                                style={{
                                    flex: '1 1 auto'
                                }}>Item{index}
                            </div>
                            <div style={{
                                display: 'inline-flex',
                            }}>
                                >
                            </div>
                        </div>
                    ))}
                </Popover>
            </div>
        );
    }
}

class PopoverInCorners extends Component {
    constructor() {
        super();
        this.positionSets = [
            [
                {
                    anchor: {
                        horizontal: 'left',
                        vertical: 'top',
                    },
                    target: {
                        horizontal: 'left',
                        vertical: 'bottom',
                    }
                },
                {
                    anchor: {
                        horizontal: 'right',
                        vertical: 'top',
                    },
                    target: {
                        horizontal: 'left',
                        vertical: 'bottom',
                    }
                },
                {
                    anchor: {
                        horizontal: 'center',
                        vertical: 'top',
                    },
                    target: {
                        horizontal: 'center',
                        vertical: 'bottom',
                    }
                },
                {
                    anchor: {
                        horizontal: 'left',
                        vertical: 'top',
                    },
                    target: {
                        horizontal: 'right',
                        vertical: 'bottom',
                    }
                },
                {
                    anchor: {
                        horizontal: 'right',
                        vertical: 'top',
                    },
                    target: {
                        horizontal: 'center',
                        vertical: 'bottom',
                    }
                },
            ],


            [
                {
                    anchor: {
                        horizontal: 'left',
                        vertical: 'top',
                    },
                    target: {
                        horizontal: 'left',
                        vertical: 'bottom',
                    }
                },
                {
                    anchor: {
                        horizontal: 'right',
                        vertical: 'top',
                    },
                    target: {
                        horizontal: 'left',
                        vertical: 'bottom',
                    }
                },
                {
                    anchor: {
                        horizontal: 'center',
                        vertical: 'top',
                    },
                    target: {
                        horizontal: 'center',
                        vertical: 'bottom',
                    }
                },
                {
                    anchor: {
                        horizontal: 'left',
                        vertical: 'top',
                    },
                    target: {
                        horizontal: 'right',
                        vertical: 'bottom',
                    }
                },
                {
                    anchor: {
                        horizontal: 'right',
                        vertical: 'top',
                    },
                    target: {
                        horizontal: 'center',
                        vertical: 'bottom',
                    }
                },
            ],
        ];
        this.anchors = [];
        this.state = {
            popoversOpen: {},
        };
    }

    render() {
        let popoverIndex = 0;
        return (
            <div>
                {this.positionSets.map((positionSet, rowIndex) => (
                    <div
                        key={rowIndex}
                        style={{
                            height: 'calc((100vh - 40px) / 3)',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                        }}>
                        {positionSet.map((positions, index) => {
                            let myIndex = popoverIndex;
                            const popover = (
                                <div
                                    style={{
                                        flex: '0 1',
                                        border: '1px solid blue',
                                    }}
                                    onClick={(evt) => {
                                        this.setState({
                                            popoversOpen: {
                                                ...this.state.popoversOpen,
                                                [myIndex]: this.state.popoversOpen[myIndex] ? !this.state.popoversOpen[myIndex] : {open: true,}
                                            }
                                        });
                                    }}
                                >
                                    <span
                                        ref={(el) => this.anchors[myIndex] = el}
                                        style={{
                                            backgroundColor: 'lightblue',
                                            display: 'inline-block',
                                            width: '150px',
                                        }}
                                    >
                                        Anchor
                                    </span>
                                    <div>
                                        anchor: {positions.anchor.vertical} - {positions.anchor.horizontal}
                                    </div>
                                    <div>
                                        target: {positions.target.vertical} - {positions.target.horizontal}
                                    </div>
                                    <Popover
                                        anchorElement={this.anchors[myIndex]}
                                        anchorOrigin={positions.anchor}
                                        open={this.state.popoversOpen[myIndex] && this.state.popoversOpen[myIndex].open}
                                        targetOrigin={positions.target}
                                    >
                                        <div style={{backgroundColor: 'white'}}>
                                            {new Array(3).fill(1).map((item, index) => (
                                                <div key={index}>Item {index}</div>
                                            ))}
                                        </div>
                                    </Popover>
                                </div>
                            );
                            popoverIndex += 1;
                            return popover;
                        })}
                    </div>
                ))}
            </div>
        );
    }
}

class PopoverOnRequestClose extends Component {
    static defaultProps = {
        showContent: false,
    };

    constructor(...rest) {
        super(...rest);
        this.state = {
            open: [false, false]
        };
        this.handleClick = this.handleClick.bind(this);
        this.closePopover = this.closePopover.bind(this);
    }

    handleClick(position) {
        let newOpen = this.state.open;
        newOpen[position] = !newOpen[position];
        this.setState({open: newOpen});
    }

    closePopover(position) {
        let newOpen = this.state.open;
        newOpen[position] = false;
        this.setState({open: newOpen});
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
                        this.anchor1 = el;
                    }}
                    onClick={() => this.handleClick(0)}
                >Anchor</span>
                {showContent && <div>This is content that the popover can render over.</div>}
                <Popover
                    anchorElement={this.anchor1}
                    anchorOrigin={anchorOrigin}
                    open={open[0]}
                    targetOrigin={targetOrigin}
                    onRequestClose={() => this.closePopover(0)}
                >
                    <div style={{backgroundColor: 'white'}}>
                        {(new Array(7).fill(1)).map((item, index) => (
                            <div key={index}>Item {index}</div>
                        ))}
                    </div>
                </Popover>
                <span
                    ref={(el) => {
                        this.anchor2 = el;
                    }}
                    onClick={() => this.handleClick(1)}
                >Anchor 2</span>
                {showContent && <div>This is content that the popover can render over.</div>}
                <Popover
                    anchorElement={this.anchor2}
                    anchorOrigin={anchorOrigin}
                    open={open[1]}
                    targetOrigin={targetOrigin}
                    onRequestClose={() => this.closePopover(1)}
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

class PopoverDemoWithNoAnchor extends Component {
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

        var div = document.createElement("div");
        div.setAttribute("class", "a-class");
        return (
            <div>
                <span
                    onClick={this.handleClick}
                >Not the Anchor</span>
                {showContent && <div>This is content that the popover can render over.</div>}
                <Popover
                    anchorElement={document.createElement("div")}
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
    .addWithInfo('nudge down',
        ``,
        () => (
            <PopoverInCorners/>
        )
    )
    .addWithInfo('click away handling excludes the anchor',
        ``,
        () => (
            <PopoverOnRequestClose/>
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
    )
    .addWithInfo('long text with min-width',
        ``,
        () => (
            <PopoverDemoWithLongTextWidth/>
        )
    )
    .addWithInfo('menu scroll',
        ``,
        () => (
            <PopoverDemoWithManyMenuItems
                anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom'
                }}
                targetOrigin={{
                    horizontal: 'left',
                    vertical: 'top'
                }}
            />
        )
    )
    .addWithInfo('no anchor',
        ``,
        () => (
            <PopoverDemoWithNoAnchor
                anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom'
                }}
                targetOrigin={{
                    horizontal: 'left',
                    vertical: 'top'
                }}
            />
        )
    )
    .addWithInfo('autoCloseWhenOffScreen set to false',
        ``,
        () => (
            <PopoverDemoWithManyMenuItems
                anchorOrigin={{
                    horizontal: 'left',
                    vertical: 'bottom'
                }}
                autoCloseWhenOffScreen={false}
                targetOrigin={{
                    horizontal: 'left',
                    vertical: 'top'
                }}
            />
        )
    );
