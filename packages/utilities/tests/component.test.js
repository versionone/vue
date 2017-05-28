import React, {Component} from 'react';
import {getDisplayName} from './../src/component';

test('can get the display name of a React component', () => {
    expect(getDisplayName(TestComponent1)).toEqual('TestComponent1');
});

test('it can get the display name of a stateless functional component', () => {
    expect(getDisplayName(TestComponent2)).toEqual('TestComponent2');
});

class TestComponent1 extends Component {
    render() {
        return (
            <span>TestComponent</span>
        );
    }
}

const TestComponent2 = (props) => props.children;
