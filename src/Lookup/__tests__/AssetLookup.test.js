import AssetLookup from './../AssetLookup';
import {getShallow} from './../../../specHelpers/rendering';

const shallowRender = getShallow(AssetLookup);

test('AssetLookup handles server errors from fetching items gracefully', () => {
    const rejectedPromise = Promise.reject('Server Error');
    const query = jest.fn().mockReturnValue(rejectedPromise);
    const component = shallowRender({
            query: 'my query',
        },
        {
            query,
        });
    expect(query).toHaveBeenCalledTimes(1);
    return rejectedPromise
        .catch(() => {
            expect(component.state().dataSource).toEqual([]);
        });
});

test('AssetLookup fetches data when created', () => {
    const dataSource = getDataSource();
    const results = Promise.resolve(dataSource);
    const query = jest.fn().mockReturnValue(results);
    const component = shallowRender({
            query: 'my query',
        },
        {
            query,
        });
    expect(query).toHaveBeenCalledTimes(1);
    expect(query).toHaveBeenCalledWith('my query');
    return results
        .then(() => {
            expect(component.state().dataSource).toEqual(dataSource);
        });
});

test('AssetLookup re-queries when its query prop changes', () => {
    const dataSource = getDataSource();
    const results = Promise.resolve(dataSource);
    const query = jest.fn().mockReturnValue(results);
    const component = shallowRender({
            query: 'my query',
        },
        {
            query,
        });
    expect(query).toHaveBeenCalledTimes(1);
    expect(query).toHaveBeenCalledWith('my query');

    component.instance().componentWillReceiveProps({
        query: 'new query'
    });

    expect(query).toHaveBeenCalledTimes(2);
    expect(query.mock.calls[1][0]).toEqual('new query');
    return results
        .then(() => {
            expect(component.state().dataSource).toEqual(dataSource);
        });
});

function getDataSource() {
    return [
        'item 1',
        'item 2',
    ];
}
