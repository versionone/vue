import Popover from './../Popover';
import {getMount, reset} from './../../../specHelpers/rendering';

const mountPopover = getMount(Popover);
let anchorElement;

beforeEach(() => {
    window.getComputedStyle = jest.fn()
        .mockReturnValue({
            borderLeftWidth: '0px',
            borderRightWidth: '0px',
        });
    anchorElement = document.createElement('div');
    document.body.appendChild(anchorElement);
});
afterEach(reset());

test('Popover will not be visible when closed or unspecified open state', () => {
    mountPopover({
        open: false,
    });
    expect(popoverIsNotVisible()).toBeTruthy();

    mountPopover();
    expect(popoverIsNotVisible()).toBeTruthy();
});

test('will not render when anchor element is detached from document', () => {
    mountPopover({
        anchorElement,
        open: true,
    })
});

test('Popovers can be opened', () => {
    mountPopover({
        anchorElement,
        open: true,
    });
    expect(popoverIsVisible()).toBeTruthy();
});

test('Popovers can be toggled from closed to opened', () => {
    const popover = mountPopover({
        anchorElement,
        open: false,
    });
    popover.setProps({
        open: true,
    });
    expect(popoverIsVisible()).toBeTruthy();
});

test('Popovers can be toggled from open to closed', () => {
    const popover = mountPopover({
        anchorElement,
        open: true,
    });
    popover.setProps({
        open: false,
    });
    expect(popoverIsNotVisible()).toBeTruthy();
});

test('Popovers can can contain content when opened', () => {
    mountPopover({
        anchorElement,
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
    return getRootElementOfPopover().children[0].innerHTML === 'Hello world';
}
