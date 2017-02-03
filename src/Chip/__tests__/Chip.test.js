import Chip from './../Chip';
import {getRender, snapshot} from './../../../specHelpers/rendering';

const renderChip = getRender(Chip);

test('it can render text in the Chip', () => {
    const component = renderChip({
        text: 'Hello Chip',
    });
    expect(snapshot(component)).toMatchSnapshot();
});
