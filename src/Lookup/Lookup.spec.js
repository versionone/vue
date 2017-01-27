import React from 'react';
import simulant from 'simulant';
import {mount} from 'enzyme';
import initializeGlobalWindow from './../../specHelpers/initializeGlobalWindow';
import AutoComplete from './Lookup';

suite('Lookup', () => {
    afterEach(initializeGlobalWindow);

    test('renders as a TextField when not open', () => {
        const lookup = mountLookup({open: false,});
        expect(autoCompleteRendersClosed(lookup)).to.be.true;
    });
    test('can render hint text', () => {
        const lookupWithNoValue = mountLookup({
            hintText: getText(),
            open: false,
        });
        expect(autoCompleteRendersHintText(lookupWithNoValue, getText())).to.be.true;
    });
    test('defaults to being closed', () => {
        const lookup = mountLookup();
        expect(autoCompleteRendersClosed(lookup)).to.be.true;
    });
    test('displays a popover of results when open', () => {
        const dataSource = getBasicDataSource();
        const lookup = mountLookup({
            dataSource: dataSource,
            open: true,
            resultsHeader: getText(),
        });
        expect(autoCompleteRendersOpen(lookup)).to.be.true;
        expect(autoCompleteResultsMatchExactly(lookup, Object.keys(dataSource).map((key) => dataSource[key]))).to.be.true;
    });
    test('has a  width that can be set or be full width', () => {
        const lookup = mountLookup({
            open: true,
            width: 250,
        });
        expect(autoCompletePopoverToBeWidth(lookup, 250)).to.be.true;

        lookup.setProps({
            width: 300,
        });
        expect(autoCompletePopoverToBeWidth(lookup, 300)).to.be.true;

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
    test('can optionally render a sub-header for the results', () => {
        const lookupWithResultsHeader = mountLookup({
            dataSource: getBasicDataSource(),
            open: true,
            resultsHeader: getText(),
        });
        expect(autoCompleteResultsHasHeaderText(lookupWithResultsHeader, getText())).to.be.true;
        lookupWithResultsHeader.unmount();

        const lookupWithoutResultsHeader = mountLookup({
            dataSource: getBasicDataSource(),
            open: true,
        });
        expect(autoCompleteResultsHasNoHeaderText(lookupWithoutResultsHeader)).to.be.true;
    });
    test('can render the item as a Chip via a getChipText value function', () => {
        const lookup = mountLookup({
            dataSource: getDataSource(),
            getChipText: (item) => item.name,
            itemRenderer: (item) => item.name,
            open: true,
            selectedItems: ['oid:1']
        });
        expect(firstListItemIsSelected(lookup, 'Testing 1')).to.be.true;
    });
    test('can set the selected item by setting the selected item prop', () => {
        const lookup = mountLookup({
            dataSource: getDataSource(),
            getChipText: (item) => item.name,
            itemRenderer: (item) => item.name,
            open: true,
            selectedItems: ['oid:1']
        });
        expect(firstListItemIsSelected(lookup, 'Testing 1')).to.be.true;
    });
    test.skip('can select an item to be set as a Chip in the search box', () => {
        const lookup = mountLookup({
            dataSource: getDataSource(),
            getChipText: (item) => item.name,
            open: true,
        });
        simulateSelectionOfFirstListItem();
        expect(firstListItemIsSelected(lookup, 'Testing 1')).to.be.true;
    });
});

function mountLookup(props = {}) {
    return mount(<AutoComplete {...props} />, {context: {theme: getTestTheme()}});
}
function getTestTheme() {
    return {
        _name: 'Test Theme',
        fieldBorderColor: '#000',
    };
}
function autoCompleteRendersClosed(wrapper) {
    return wrapper.find('Popover').props().open === false;
}

function autoCompleteRendersOpen(wrapper) {
    return wrapper.find('Popover').props().open === true;
}
function getBasicDataSource() {
    return {
        'oid:1': 'Testing 1',
        'oid:2': 'Testing 2',
        'oid:3': 'Testing 3',
    };
}
function getDataSource() {
    return {
        'oid:1': {
            name: 'Testing 1'
        },
        'oid:2': {
            name: 'Testing 3'
        },
    };
}

function getRootElementOfPopover() {
    return document
        .body
        .getElementsByTagName('div')[1];
}
function getText() {
    return 'Result List';
}
function autoCompleteResultsHasHeaderText(wrapper, text) {
    return getRootElementOfPopover()
            .children[0]
            .children[0]
            .children[0]
            .innerHTML === text;
}
function autoCompleteResultsMatchExactly(wrapper, results) {
    let resultList = getRootElementOfPopover()
        .children[0]
        .children[0];
    let startResultsIndex = 0;
    if (resultList.children[0].tagName === 'HEADER') {
        startResultsIndex = 1;
    }
    return resultList.children.length === results.length + startResultsIndex
        && Object.keys(results)
            .map(key => results[key])
            .reduce(areAllResultsContainedWithin(resultList), true);
}
function areAllResultsContainedWithin(resultsList) {
    const childrenAsArray = Object.keys(resultsList.children)
        .map((key) => resultsList.children[key]);
    return (output, result) => {
        return output && Boolean(childrenAsArray
                .find(matchingResultText(result)));
    }
}
function matchingResultText(textToMatch) {
    const exp = new RegExp(textToMatch);
    return (el) => el.innerHTML.match(exp);
}
function autoCompleteResultsHasNoHeaderText(wrapper) {
    return getRootElementOfPopover()
            .children
            .length === 0
        || getRootElementOfPopover()
            .children[0]
            .tagName !== 'HEADER';
}
function autoCompletePopoverToBeWidth(wrapper, width) {
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
function autoCompleteRendersHintText(wrapper, text) {
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
