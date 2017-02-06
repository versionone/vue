import simulant from 'simulant';
import Lookup from './../Lookup';
import {getMount, getShallow, snapshot} from './../../../specHelpers/rendering';

const mountLookup = getMount(Lookup);
const shallowRenderLookup = getShallow(Lookup);

let component;
afterEach(() => {
    component.unmount();
    document.body.innerHTML = '';
});

test('Lookup renders as a TextField when not open', () => {
    component = shallowRenderLookup({
        hintText: 'hint text',
        open: false,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('Lookup defaults to being closed', () => {
    component = shallowRenderLookup();
    expect(snapshot(component)).toMatchSnapshot();
});

test('Lookup can display a single result group when open', () => {
    const dataSource = getBasicDataSource();
    component = mountLookup({
        dataSource,
        open: true,
        resultGroups: 'Header',
    });
    expect(lookupRendersOpen(component)).toBeTruthy();
    expect(lookupGroupResultsMatchExactly(component, 0, 'Header', dataSource)).toBeTruthy();
});

test('Lookup can have a set widths', () => {
    component = mountLookup({
        dataSource: getBasicDataSource(),
        open: true,
        resultGroups: 'Header',
        width: 250,
    });
    expect(lookupPopoverToBeWidth(component, 250)).toBeTruthy();

    component.setProps({
        width: 300,
    });
    expect(lookupPopoverToBeWidth(component, 300)).toBeTruthy();
});

test('Lookup can be set to be full width', () => {
    component = shallowRenderLookup({
        dataSource: getBasicDataSource(),
        fullWidth: true,
        open: true,
        resultGroups: 'Header',
        width: 100,
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('Lookup can render multiple groupings of results via their filters', () => {
    component = mountLookup({
        dataSource: getBasicDataSource(),
        open: true,
        resultGroups: [
            {
                header: 'Header 1',
                filter: () => true,
            },
            {
                header: 'Header 2',
                filter: (searchText, value, index) => index === 1,
            },
        ],
    });

    expect(lookupRendersOpen(component)).toBeTruthy();
    expect(lookupGroupResultsMatchExactly(component, 0, 'Header 1', getBasicDataSource())).toBeTruthy();
    expect(lookupGroupResultsMatchExactly(component, 1, 'Header 2', [
        'Testing 2',
    ])).toBeTruthy();
});

test('Lookup renders the explicitly set selected item as a Chip', () => {
    component = shallowRenderLookup({
        dataSource: getBasicDataSource(),
        open: true,
        selectedItems: [0],
    });
    expect(snapshot(component)).toMatchSnapshot();

    component = shallowRenderLookup({
        dataSource: getDataSource(),
        dataSourceConfig: getDataSourceConfig(),
        open: true,
        selectedItems: ['oid:1'],
    });
    expect(snapshot(component)).toMatchSnapshot();
});

test('Lookup can select an item and render it as a Chip', () => {
    const onSelect = jest.fn();
    component = mountLookup({
        dataSource: getBasicDataSource(),
        onSelect,
        open: true,
        resultGroups: 'header',
    });
    simulateSelectionOfFirstListItem();
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith(0);
    expect(firstListItemIsSelected(component, 'Testing 1')).toBeTruthy();
});

test('Clicking on the Chip removal icon removes the Chip as the selected item', () => {
    component = mountLookup({
        dataSource: getBasicDataSource(),
        open: false,
        selectedItems: ['Testing 1'],
    });
    simulateChipRemoval(component);
    expect(noSelectedItems(component)).toBeTruthy();
});

function lookupRendersOpen(wrapper) {
    return wrapper.find('Popover').props().open === true;
}
function getBasicDataSource() {
    return [
        'Testing 1',
        'Testing 2',
        'Testing 3',
    ];
}
function getDataSource() {
    return [
        {
            name: 'Testing 1',
            oid: 'oid:1',
        },
        {
            name: 'Testing 2',
            oid: 'oid:2',
        },
    ];
}

function getRootElementOfPopover() {
    return document
        .body
        .getElementsByTagName('div')[1];
}
function lookupGroupResultsMatchExactly(wrapper, groupIndex, headerText, results) {
    const resultList = getRootElementOfPopover()
        .children[0]
        .children[0];
    const resultItems = childrenAsArray(resultList);
    const groupStartIndex = getGroupStartIndex(resultItems, groupIndex);
    const groupEndIndex = groupStartIndex + results.length + 1;
    const groupHeader = resultItems.slice(groupStartIndex, groupStartIndex + 1)[0].children[0];
    const groupItems = resultItems.slice(groupStartIndex + 1, groupEndIndex);

    return groupHeader.innerHTML === headerText
        && groupItems
            .map(groupItem => groupItem.children[0].innerHTML)
            .reduce((output, text, index) => output && text.indexOf(results[index]) >= 0, true);
}
function getGroupStartIndex(items, groupIndex) {
    const groups = items.filter((item) => item.children[0].tagName === 'HEADER');
    const group = groups[groupIndex];
    return items.indexOf(group);
}
function lookupPopoverToBeWidth(wrapper, width) {
    return wrapper
            .find('input')
            .parent()
            .props()
            .style
            .width === width
        && getRootElementOfPopover()
            .children[0]
            .style
            .width === `${width}px`;
}
function simulateSelectionOfFirstListItem() {
    const el = getRootElementOfPopover()
        .children[0]
        .children[0]
        .children[1];
    const evt = simulant('click');
    simulant.fire(el, evt);
}
function firstListItemIsSelected(wrapper, selectedText) {
    return wrapper.find('Chip').text() === selectedText;
}
function getDataSourceConfig() {
    return {
        oidKey: 'oid',
        renderItem: item => item.name,
        text: 'name',
    };
}
function simulateChipRemoval(wrapper) {
    wrapper.find('IconButton').simulate('click');
}
function noSelectedItems(wrapper) {
    return !wrapper.find('Chip').exists();
}
function childrenAsArray(parent) {
    return Object.keys(parent.children)
        .map(key => parent.children[key]);
}
