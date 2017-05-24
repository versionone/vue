import React from 'react';
import simulant from 'simulant';
import Lookup from './../Lookup';
import {getMount, getShallow, reset, snapshot} from './../../../testHelpers/rendering';

jest.useFakeTimers();
const mountLookup = getMount(Lookup);
const shallowRenderLookup = getShallow(Lookup);
beforeEach(() => {
    window.getComputedStyle = jest.fn()
        .mockReturnValue({
            borderLeftWidth: '0px',
            borderRightWidth: '0px',
        });
});

let component;
afterEach(reset(component));

describe.skip('skipping tests as Lookup will be heavily refactored and these tests are no longer as relevant', () => {
    test('Lookup renders as a TextField when not open', () => {
        component = shallowRenderLookup({
            hintText: 'hint text',
            open: false,
        });
        expect(snapshot(component)).toMatchSnapshot();
    });

// Requried element.getBoundingClientRect does not populate with jsdom and therefore this cannot be tested.
// test.skip('Lookup can render hint text that is longer/larger than what would fit within the search text input field', () => {
// const div = document.createElement('div');
// document.body.appendChild(div);
// render((
//     <ThemeProvider theme={testTheme}>
//         <Lookup
//             hintText="hint text, hint text, more hint text, do you believe in the power of the hint text....????"
//             width={10}
//         />
//     </ThemeProvider>
// ), div);
// });

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
        window.getComputedStyle.mockReturnValue({
            borderLeftWidth: '0px',
            borderRightWidth: '0px',
            width: '600px',
        });
        component = mountLookup({
            dataSource: getBasicDataSource(),
            fullWidth: true,
            open: true,
            resultGroups: 'Header',
        });
        expect(lookupPopoverToBeWidth(component, 600)).toBeTruthy();
    });

    test('Lookup can be set to a width, then updated to be full width', () => {
        window.getComputedStyle.mockReturnValue({
            borderLeftWidth: '0px',
            borderRightWidth: '0px',
            width: '500px',
        });
        component = mountLookup({
            dataSource: getBasicDataSource(),
            open: true,
            resultGroups: 'Header',
            width: 300,
        });
        component.setProps({
            fullWidth: true,
        });
        expect(lookupPopoverToBeWidth(component, 500)).toBeTruthy();
    });

    test('Lookup can render multiple groupings of results via their filters', () => {
        component = mountLookup({
            dataSource: getBasicDataSource(),
            open: true,
            resultGroups: [
                {
                    filter: () => true,
                    header: 'Header 1',
                },
                {
                    filter: (searchText, value, index) => index === 1,
                    header: 'Header 2',
                },
            ],
        });

        expect(lookupRendersOpen(component)).toBeTruthy();
        expect(lookupGroupResultsMatchExactly(component, 0, 'Header 1', getBasicDataSource())).toBeTruthy();
        expect(lookupGroupResultsMatchExactly(component, 1, 'Header 2', [
            'Testing 2',
        ])).toBeTruthy();
    });

    test('Lookup can provide custom render for selected text and items', () => {
        component = shallowRenderLookup({
            dataSource: getDataSource(),
            dataSourceConfig: getCustomTextRendererDataSourceConfig(),
            open: true,
            selectedItems: ['oid:1'],
        });
        expect(snapshot(component)).toMatchSnapshot();

        component = mountLookup({
            dataSource: getDataSource(),
            dataSourceConfig: getCustomTextRendererDataSourceConfig(),
            open: true,
            resultGroups: 'Header',
        });
        expect(lookupGroupResultsMatchExactly(component, 0, 'Header', getBasicDataSource())).toBeTruthy();
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

    test('Lookup can render the selected item as a Chip and then be updated with a new selected item to render as a Chip', () => {
        component = shallowRenderLookup({
            dataSource: getBasicDataSource(),
            open: true,
            selectedItems: [0],
        });
        component.setProps({
            selectedItems: [1],
        });
        expect(snapshot(component)).toMatchSnapshot();

        component = shallowRenderLookup({
            dataSource: getDataSource(),
            dataSourceConfig: getDataSourceConfig(),
            open: true,
            selectedItems: ['oid:1'],
        });
        component.setProps({
            selectedItems: ['oid:2'],
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
        expect(onSelect.mock.calls[0][1]).toEqual(0);
        expect(firstListItemIsSelected(component, 'Testing 1')).toBeTruthy();
    });

    test('tabbing the text field causes Lookup to deactivate', () => {
        const onDeactivate = jest.fn();
        component = mountLookup({
            dataSource: getBasicDataSource(),
            onDeactivate,
            open: true,
            resultGroups: 'header',
        });
        simulateTab(component);
        expect(onDeactivate).toHaveBeenCalledTimes(1);
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

    test('Lookup will filter results when search text is input/applied using the provided searchFilter prop', () => {
        component = mountLookup({
            dataSource: getBasicDataSource(),
            open: true,
            resultGroups: 'header',
            searchFilter: (searchText, item) => item.indexOf(searchText) >= 0,
            searchText: 'ing 1',
        });
        expect(lookupGroupResultsMatchExactly(component, 0, 'header', ['Testing 1'])).toBeTruthy();
        component.setProps({
            searchText: 'ing 2',
        });
        expect(lookupGroupResultsMatchExactly(component, 0, 'header', ['Testing 2'])).toBeTruthy();
    });

    test('Lookup can be accept entry of search text to be applied to the search filter', () => {
        component = mountLookup({
            dataSource: getBasicDataSource(),
            open: true,
            resultGroups: 'header',
            searchFilter: (searchText, item) => item.indexOf(searchText) >= 0,
            searchText: 'ing ',
        });
        simulateSearchTextEntry(component, 'ing 1');
        expect(lookupGroupResultsMatchExactly(component, 0, 'header', ['Testing 1'])).toBeTruthy();
    });

    test('Clicking the Lookup will activate it only if it is not already active', () => {
        let onActivate = jest.fn();
        component = mountLookup({
            dataSource: getBasicDataSource(),
            onActivate,
            open: false,
            resultGroups: 'header',
            searchFilter: (searchText, item) => item.indexOf(searchText) >= 0,
            searchText: 'ing ',
        });
        simulateTextFocus(component);
        expect(onActivate).toHaveBeenCalledTimes(1);

        onActivate = jest.fn();
        component = mountLookup({
            dataSource: getBasicDataSource(),
            onActivate,
            open: true,
            resultGroups: 'header',
            searchFilter: (searchText, item) => item.indexOf(searchText) >= 0,
            searchText: 'ing ',
        });
        simulateTextFocus(component);
        expect(onActivate).not.toHaveBeenCalled();
    });

    test('Clicking the hint text sends focus to the search text input field', () => {
        component = mountLookup({
            dataSource: getBasicDataSource(),
            open: true,
            resultGroups: 'header',
            searchFilter: (searchText, item) => item.indexOf(searchText) >= 0,
            searchText: 'ing ',
        });
        simulateClickHintTextLookup(component);
        expect(searchTextToBeFocused()).toBeTruthy();
    });

    test('Clicking outside of the lookup will close/deactivate the lookup', () => {
        const mappedEventHandlers = {};
        window.addEventListener = jest.fn().mockImplementation((event, cb) => {
            mappedEventHandlers[event] = cb;
        });
        const onDeactivate = jest.fn();
        component = mountLookup({
            dataSource: getBasicDataSource(),
            open: true,
            resultGroups: 'header',
            onDeactivate,
            searchFilter: (searchText, item) => item.indexOf(searchText) >= 0,
            searchText: 'ing ',
        });
        jest.runAllTimers();
        simulateClickAway(mappedEventHandlers);
        expect(lookupIsClosed(component)).toBeTruthy();
        expect(onDeactivate).toHaveBeenCalledTimes(1);
    });

// ---

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
                .map((groupItem) => groupItem.children[0].innerHTML)
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
            renderItem: (item) => item.name,
            renderSelectedItem: 'name',
        };
    }

    function getCustomTextRendererDataSourceConfig() {
        return {
            oidKey: 'oid',
            renderItem: (item) => item.name,
            renderSelectedItem: (item) => item.name,
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
            .map((key) => parent.children[key]);
    }

    function simulateClickHintTextLookup(wrapper, evt = {}) {
        wrapper.find('HintText').simulate('click', evt);
    }

    function simulateSearchTextEntry(wrapper, enteredText) {
        wrapper.find('input').simulate('change', {
            target: {
                value: enteredText,
            },
        });
    }

    function searchTextToBeFocused() {
        return document.activeElement.tagName === 'INPUT';
    }

    function simulateClickAway(mappedEventHandlers) {
        const evt = {
            defaultPrevented: false,
            target: window,
        };
        mappedEventHandlers.click(evt);
    }

    function lookupIsClosed(wrapper) {
        return wrapper.state().open === false;
    }

    function simulateTextFocus(wrapper) {
        wrapper.find('input').simulate('focus');
    }

    function simulateTab(wrapper) {
        wrapper.find('input').simulate('keydown', {
            keyCode: 9,
        });
    }
});
