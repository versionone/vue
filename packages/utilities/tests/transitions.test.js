import {create, easeInOutFunction, easeOut, easeOutFunction} from './../src/transitions';

test('it exports easing functions', () => {
    expect(easeInOutFunction).toBeDefined();
    expect(easeOutFunction).toBeDefined();
});

test('easing CSS styles can be created', () => {
    const defaultEasingCss = create();
    expect(defaultEasingCss).toEqual('all 450ms linear 0ms');

    const customEasingCss = create('500ms', 'background', '5ms', 'customEase');
    expect(customEasingCss).toEqual('background 500ms customEase 5ms');
});

test('easeOut CSS styles can be created for one or more property at a time', () => {
    const singlePropertyEaseOutCss = easeOut('500ms', 'background');
    expect(singlePropertyEaseOutCss).toEqual('background 500ms cubic-bezier(0.23, 1, 0.32, 1) 0ms');

    const multiplePropertyEaseOutCss = easeOut('400ms', ['color', 'background']);
    expect(multiplePropertyEaseOutCss).toEqual('color 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms,background 400ms cubic-bezier(0.23, 1, 0.32, 1) 0ms');
});
