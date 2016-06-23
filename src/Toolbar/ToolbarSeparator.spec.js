import React from 'react';
import {mount} from 'enzyme';
import ThemeProvider from './../styles/ThemeProvider';
import ToolbarSeparator from './ToolbarSeparator';

describe('<ToolbarTitle />', function() {
    describe('when rendering a toolbar separator', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><ToolbarSeparator /></ThemeProvider>);
        });
        it('it should render a single div separator', () => {
            this.wrapper.length.should.equal(1);
            this.wrapper.children().length.should.equal(0);
        });
    });

    describe('when rendering the toolbar separator with a className', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><ToolbarSeparator className="my-class-name" /></ThemeProvider>);
        });
        it('it should render the toolbar group title with specified className on the root element', () => {
            this.wrapper.should.have.className('my-class-name');
        });
    });

    describe('when rendering the toolbar separator with a custom style', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><ToolbarSeparator style={{display: 'inline'}} /></ThemeProvider>);
        });
        it('it should render the Toolbar with the style prop applied to the root element', () => {
            this.wrapper.should.have.style('display', 'inline');
        });
    });
});