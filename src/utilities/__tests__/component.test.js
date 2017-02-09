import {Component} from 'react';
import {
    createConditionalEventHandler,
    createEventHandler,
    createEventHandlerIgnoringEventData,
    getDisplayName
} from './../component';

const evt = {
    test: true,
};

test('the display name can be retrieved from a component and stateless, functional component', () => {
    expect(getDisplayName(TestComponent)).toEqual('TestComponent');
    expect(getDisplayName(testComponentFunction)).toEqual('TestComponentFunction');
    expect(getDisplayName(testComponentWithoutDisplayName)).toEqual('testComponentWithoutDisplayName');
    expect(getDisplayName(() => null)).toEqual('Component');
});

test('function can create an event handler that calls provided handler with event and any other passed parameters', () => {
    const handler = jest.fn();
    createEventHandler(handler, 'param1', 2)(evt);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(evt, 'param1', 2);
});

test('function can create an event handler that conditionally calls provided handler with event and any other passed parameters', () => {
    const notExecutedHandler = jest.fn();
    createConditionalEventHandler(false)(notExecutedHandler, 'param1', 2)(evt);
    expect(notExecutedHandler).toHaveBeenCalledTimes(0);

    const handler = jest.fn();
    createConditionalEventHandler(true)(handler, 'param1', 2)(evt);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith(evt, 'param1', 2);
});

test('function can create an event handler that calls provided handler with the provided arguments, but not passing the event itself', () => {
    const handler = jest.fn();
    createEventHandlerIgnoringEventData(handler, 'param1', 2)(evt);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(handler).toHaveBeenCalledWith('param1', 2);
});

// --

class TestComponent extends Component {
    render() {
        return null;
    }
}
function testComponentFunction() {
    return null;
}
testComponentFunction.displayName = 'TestComponentFunction';
function testComponentWithoutDisplayName() {
    return null;
}
