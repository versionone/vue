import React from 'react';
import simulant from 'simulant';
import {mount} from 'enzyme';
import initializeGlobalWindow from './../../specHelpers/initializeGlobalWindow';
import Lookup from './Lookup';

suite('Lookup', () => {
    afterEach(initializeGlobalWindow);

    test('renders as a TextField when not open', () => {
        const lookup = mountLookup({open: false, });
        expect(lookupRendersClosed(lookup)).to.be.true;
    });

    test('can render hint text', () => {
        const lookupWithNoValue = mountLookup({
            hintText: getText(),
            open: false,
        });
        expect(lookupRendersHintText(lookupWithNoValue, getText())).to.be.true;
    });

    test('defaults to being closed', () => {
        const lookup = mountLookup();
        expect(lookupRendersClosed(lookup)).to.be.true;
    });

    test('displays a popover of results when open', () => {
        const dataSource = getBasicDataSource();
        const lookup = mountLookup({
            dataSource,
            open: true,
            resultGroups: [{
                header: getText(),
                filter: () => true,
            }],
        });
        expect(lookupRendersOpen(lookup)).to.be.true;
        expect(lookupGroupResultsMatchExactly(lookup, 0, getText(), dataSource)).to.be.true;
    });

    test('has a width that can be set or be full width', () => {
        const lookup = mountLookup({
            open: true,
            width: 250,
        });
        expect(lookupPopoverToBeWidth(lookup, 250)).to.be.true;

        lookup.setProps({width: 300, });
        expect(lookupPopoverToBeWidth(lookup, 300)).to.be.true;

        // const fullWidthAutoComplete = mountAutoComplete({
        //     fullWidth: true,
        //     open: true,
        // });
        // expect(autoCompletePopoverToBeFullWidth(fullWidthAutoComplete)).to.be.true;
        //
        // const fullWidthAutoCompleteWithSetWidth = mountAutoComplete({
        //     fullWidth: true,
        //     open: true,
        //     width: 250,
        // });
        // expect(autoCompletePopoverToBeFullWidth(fullWidthAutoCompleteWithSetWidth)).to.be.true;
    });

    test('can render multiple filtered sub-groups', () => {
        const lookup = mountLookup({
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

        expect(lookupRendersOpen(lookup)).to.be.true;
        expect(lookupGroupResultsMatchExactly(lookup, 0, 'Header 1', getBasicDataSource())).to.be.true;
        expect(lookupGroupResultsMatchExactly(lookup, 1, 'Header 2', [
            'Testing 2',
        ])).to.be.true;
    });

    test('can render selected item as a Chip', () => {
        const basicLookup = mountLookup({
            dataSource: getBasicDataSource(),
            open: true,
            selectedItems: [0],
        });
        expect(firstListItemIsSelected(basicLookup, 'Testing 1')).to.be.true;

        const dataObjectLookup = mountLookup({
            dataSource: getDataSource(),
            dataSourceConfig: getDataSourceConfig(),
            open: true,
            selectedItems: ['oid:1'],
        });
        expect(firstListItemIsSelected(dataObjectLookup, 'Testing 1')).to.be.true;
    });

    test.skip('can select an item to be set as a Chip in the search box', () => {
        const lookup = mountLookup({
            dataSource: getBasicDataSource(),
            open: true,
        });
        simulateSelectionOfFirstListItem();
        expect(firstListItemIsSelected(lookup, 'Testing 1')).to.be.true;
    });

    test('Clicking on the Chip removal icon removes the Chip as the selected item', () => {
        const lookup = mountLookup({
            dataSource: getBasicDataSource(),
            open: false,
            selectedItems: ['Testing 1'],
        });
        simulateChipRemoval(lookup);
        expect(noSelectedItems(lookup)).to.be.true;
    });
});

function mountLookup(props = {}) {
    return mount(<Lookup {...props} />, {context: {theme: getTestTheme()}});
}
function getTestTheme() {
    return {
        _name: 'Test Theme',
        fieldBorderColor: '#000',
        largeGutter: 12,
        smallGutter: 6,
    };
}
function lookupRendersClosed(wrapper) {
    return wrapper.find('Popover').props().open === false;
}

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
function getText() {
    return 'Result List';
}
function lookupGroupResultsMatchExactly(wrapper, groupIndex, headerText, results) {
    const resultList = getRootElementOfPopover()
        .children[0]
        .children[0];
    const resultItems = childrenAsArray(resultList);
    const groupStartIndex = getGroupStartIndex(resultItems, groupIndex);
    const groupEndIndex = groupStartIndex + results.length + 1;

    const groupHeader = resultItems.slice(groupStartIndex, groupStartIndex + 1)[0];
    const groupItems = resultItems.slice(groupStartIndex + 1, groupEndIndex);

    return groupHeader.innerHTML === headerText
        && groupItems
            .map(groupItem => groupItem.children[0].innerHTML)
            .reduce((output, text, index) => output && text === results[index], true);
}
function getGroupStartIndex(items, index) {
    if (index === 0) {
        return 0;
    }
    let groupNumber = -1;
    return items.reduce((startIndex, item) => {
        if (item.tagName === 'HEADER') {
            groupNumber += 1;
        }
        if (groupNumber === index) {
            return startIndex;
        }
        return startIndex + 1;
    }, 0);
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
function lookupRendersHintText(wrapper, text) {
    return wrapper
            .find('input')
            .parent()
            .parent()
            .text() === text;
}
// function autoCompletePopoverToBeFullWidth(wrapper) {
//     return wrapper
//             .find('TextField')
//             .props()
//             .fullWidth === true
//         && getRootElementOfPopover()
//             .children[0].width;
// }
function simulateSelectionOfFirstListItem() {
    const el = getRootElementOfPopover()
        .children[0]
        .children[0]
        .children[0];
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
