import RequiredIndicator from '../RequiredIndicator';
import {getShallow, snapshot} from './../../../testHelpers/rendering';

const shallowRenderIndicator = getShallow(RequiredIndicator);

test('required indicator renders with defaults', () => {
    const component = shallowRenderIndicator();
    expect(snapshot(component)).toMatchSnapshot();
});

test('required indicator renders with defaults', () => {
    const component = shallowRenderIndicator({
        hidden: true,
    });
    expect(snapshot(component)).toMatchSnapshot();
});
