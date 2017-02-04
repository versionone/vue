import RequiredIndicator from '../RequiredIndicator';
import {getRender, snapshot} from './../../../specHelpers/rendering';

const renderIndicator = getRender(RequiredIndicator);

test('required indicator renders with defaults', () => {
    const hiddenComponent = renderIndicator();
    expect(snapshot(hiddenComponent)).toMatchSnapshot();
});

test('required indicator renders with defaults', () => {
    const hiddenComponent = renderIndicator({
        hidden: true,
    });
    expect(snapshot(hiddenComponent)).toMatchSnapshot();
});
