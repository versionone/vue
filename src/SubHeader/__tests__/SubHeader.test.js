import SubHeader from '../SubHeader';
import {getShallow, snapshot} from './../../../testHelpers/rendering';

const shallowRenderSubHeader = getShallow(SubHeader);

test('it renders text as a sub header', () => {
    const component = shallowRenderSubHeader({
        children: getTextContent(),
    });
    expect(snapshot(component)).toMatchSnapshot();
});

// --

function getTextContent() {
    return 'Hello world.';
}
