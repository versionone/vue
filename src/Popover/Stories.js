import React, {Component} from 'react';
import {storiesOf} from '@kadira/storybook';
import Popover from './';

storiesOf('Popover')
    .addWithInfo('default anchor (body)',
        `Popovers are opened via a \`isOpen\` prop and by default are anchored to the body`,
        (context) => (
            <div style={{marginTop: '150px'}}>
                <span onClick={() => context.setState({isOpen: !context.state.isOpen})}>Toggle Popover</span>
                <Popover isOpen={context.state.isOpen}>
                    <h3>Hi!</h3>
                    <p>I'm a popover. It's great to meet you!</p>
                </Popover>
            </div>
        )
    )
    .addWithInfo('anchor is a DOM element',
        `A popover can be optionally anchored to an element, passed in as a prop; \`anchorElement\`. The prop's value must be a native DOM element or React ref.`,
        () => (
            <PopoverExample />
        )
    );

class PopoverExample extends Component {
    constructor(...rest) {
        super(...rest);
        this.state = {
            isOpen: false
        };
    }

    render() {
        return (
            <div style={{marginTop: '150px'}}>
                <span ref="anchor"
                      onClick={() => this.setState({isOpen: !this.state.isOpen})}>Toggle Popover</span>
                <Popover isOpen={this.state.isOpen} anchorElement={this.refs.anchor}>
                    <h3>Hi!</h3>
                    <p>I'm a popover. It's great to meet you!</p>
                </Popover>
            </div>
        );
    }
}