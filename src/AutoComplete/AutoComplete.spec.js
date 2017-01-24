import React from 'react';
import {mount} from 'enzyme';
import initializeGlobalWindow from './../../specHelpers/initializeGlobalWindow';
import AutoComplete from './AutoComplete';

suite('AutoComplete', () => {
    afterEach(initializeGlobalWindow);

    test('it renders as a TextField when not open', () => {
        const autoComplete = mountAutoComplete({open: false,});
        expect(autoCompleteRendersClosed(autoComplete)).to.be.true;
    });
    test('it can render hint text', () => {
        const autoCompleteWithNoValue = mountAutoComplete({open: false, hintText: getText()});
        expect(autoCompleteRendersHintText(autoCompleteWithNoValue, getText())).to.be.true;
    });
    test('it defaults to being closed', () => {
        const autoComplete = mountAutoComplete();
        expect(autoCompleteRendersClosed(autoComplete)).to.be.true;
    });
    test('it displays a popover of results when open', () => {
        const autoComplete = mountAutoComplete({
            open: true,
            dataSource: getDataSource(),
            resultsHeader: getText(),
        });
        expect(autoCompleteRendersOpen(autoComplete)).to.be.true;
        expect(autoCompleteResultsMatchExactly(autoComplete, getDataSource())).to.be.true;
    });
    test('the width can be set or be full Width', () => {
        const autoComplete = mountAutoComplete({
            open: true,
            width: 250,
        });
        expect(autoCompletePopoverToBeWidth(autoComplete, 250)).to.be.true;

        autoComplete.setProps({
            width: 300,
        });
        expect(autoCompletePopoverToBeWidth(autoComplete, 300)).to.be.true;

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
    test('it can render a sub-header for the results', () => {
        const autoCompleteWithResultsHeader = mountAutoComplete({
            open: true,
            dataSource: getDataSource(),
            resultsHeader: getText(),
        });
        expect(autoCompleteResultsHasHeaderText(autoCompleteWithResultsHeader, getText())).to.be.true;
        autoCompleteWithResultsHeader.unmount();

        const autoCompleteWithoutResultsHeader = mountAutoComplete({
            open: true,
            dataSource: getDataSource(),
        });
        expect(autoCompleteResultsHasNoHeaderText(autoCompleteWithoutResultsHeader)).to.be.true;
    });
});

function mountAutoComplete(props = {}) {
    return mount(<AutoComplete {...props} />, {context: {theme: getTestTheme()}});
}
function getTestTheme() {
    return {
        _name: 'Test Theme',
    };
}
function autoCompleteRendersClosed(wrapper) {
    return wrapper.find('Popover').props().open === false;
}

function autoCompleteRendersOpen(wrapper) {
    return wrapper.find('Popover').props().open === true;
}
function getDataSource() {
    return [
        'Testing 1',
        'Testing 2',
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
function autoCompleteResultsHasHeaderText(wrapper, text) {
    return getRootElementOfPopover()
            .children[0]
            .children[0]
            .innerHTML === text;
}
function autoCompleteResultsMatchExactly(wrapper, results) {
    let resultList = getRootElementOfPopover()
        .children[0];
    if (resultList.tagName === 'HEADER') {
        resultList = resultList.parentNode.children[1];
    }
    return resultList.children.length === results.length
        && results.reduce(areAllResultsContainedWithin(resultList), true);
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
            .find('TextField')
            .props()
            .width === width
        && getRootElementOfPopover()
            .children[0]
            .style
            .width === `${width}px`;
}
function autoCompleteRendersHintText(wrapper, text) {
    return wrapper
            .find('TextField')
            .text() === text;
}
function autoCompletePopoverToBeFullWidth(wrapper) {
    return wrapper
            .find('TextField')
            .props()
            .fullWidth === true
        && getRootElementOfPopover()
            .children[0].width;
}
