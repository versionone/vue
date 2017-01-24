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
    test('it defaults to being closed', () => {
        const autoComplete = mountAutoComplete();
        expect(autoCompleteRendersClosed(autoComplete)).to.be.true;
    });
    test('it displays a popover of results when open', () => {
        const autoComplete = mountAutoComplete({
            open: true,
            dataSource: getDataSource(),
            resultsHeader: getHeaderText(),
        });
        expect(autoCompleteRendersOpen(autoComplete)).to.be.true;
        expect(autoCompleteResultsMatchExactly(autoComplete, getDataSource())).to.be.true;
    });
    test('it can render a sub-header for the results', () => {
        const autoCompleteWithResultsHeader = mountAutoComplete({
            open: true,
            dataSource: getDataSource(),
            resultsHeader: getHeaderText(),
        });
        expect(autoCompleteResultsHasHeaderText(autoCompleteWithResultsHeader, getHeaderText())).to.be.true;
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
    return document.body.getElementsByTagName('div')[1];
}
function getHeaderText() {
    return 'Result List';
}
function autoCompleteResultsHasHeaderText(wrapper, text) {
    return getRootElementOfPopover().children[0].innerHTML === text;
}
function autoCompleteResultsMatchExactly(wrapper, results) {
    let resultList = getRootElementOfPopover().children[0];
    if (resultList.tagName === 'HEADER') {
        resultList = resultList.parentNode.children[1];
    }
    return resultList.children.length === results.length
        && results.reduce(areAllResultsContainedWithin(resultList), true);
}

function areAllResultsContainedWithin(resultsList) {
    const childrenAsArray = Object.keys(resultsList.children).map((key) => resultsList.children[key]);
    return (output, result) => {
        return output && Boolean(childrenAsArray.find(matchingResultText(result)));
    }
}
function matchingResultText(textToMatch) {
    const exp = new RegExp(textToMatch);
    return (el) => el.innerHTML.match(exp);
}

function autoCompleteResultsHasNoHeaderText(wrapper) {
    return getRootElementOfPopover().children.length === 0 || getRootElementOfPopover().children[0].tagName !== 'HEADER';
}
