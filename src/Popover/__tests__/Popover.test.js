import Popover from './../Popover';
import {getMount, reset} from './../../../specHelpers/rendering';

afterEach(reset());
const mountPopover = getMount(Popover);

test('Popover will not be visible when closed or unspecified open state', () => {
    mountPopover({
        open: false,
    });
    expect(popoverIsNotVisible()).toBeTruthy();

    mountPopover();
    expect(popoverIsNotVisible()).toBeTruthy();
});

test('Popovers can be opened', () => {
    mountPopover({
        open: true,
    });
    expect(popoverIsVisible()).toBeTruthy();
});

test('Popovers can be toggled from closed to opened', () => {
    const popover = mountPopover({
        open: false,
    });
    popover.setProps({
        open: true,
    });
    expect(popoverIsVisible()).toBeTruthy();
});

test('Popovers can be toggled from open to closed', () => {
    const popover = mountPopover({
        open: true,
    });
    popover.setProps({
        open: false,
    });
    expect(popoverIsNotVisible()).toBeTruthy();
});

test('Popovers can can contain content when opened', () => {
    mountPopover({
        children: 'Hello world',
        open: true,
    });
    expect(popoverToContainContent()).toBeTruthy();
});

// ---

function getRootElementOfPopover() {
    return document.body.getElementsByTagName('div')[1];
}
function popoverIsNotVisible() {
    return getRootElementOfPopover() === undefined;
}
function popoverIsVisible() {
    return getRootElementOfPopover() !== undefined;
}
function popoverToContainContent() {
    return getRootElementOfPopover().innerHTML === 'Hello world';
}
