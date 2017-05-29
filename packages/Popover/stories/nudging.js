import React, {Component} from 'react';
import {storiesOf} from '@storybook/react';
import Popover from './../src';

storiesOf('Popover')
    .add('nudging', () => (
            <div style={{
                textAlign: 'center',
            }}
            >
                <h2>Click anchors to toggle popovers</h2>
                <PopoverInCorners />
            </div>
        )
    );

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
                                    key={myIndex}
                                    style={{
                                        flex: '0 1',
                                        border: '1px solid blue',
                                    }}
                                    onClick={() => {
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
                                            {new Array(10).fill(1).map((item, index) => (
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
