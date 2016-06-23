import React from 'react';
import {mount} from 'enzyme';
import ThemeProvider from './../styles/ThemeProvider';
import ToolbarGroupTitle from './ToolbarTitle';

describe('<ToolbarTitle />', function() {
    describe('when rendering a toolbar title', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><ToolbarGroupTitle text="Title" /></ThemeProvider>);
        });
        it('it should render the text in an h2 element', () => {
            this.wrapper.find('div > span').length.should.equal(1);
            this.wrapper.find('div > span').text().should.equal('Title');
        });
    });

    describe('when rendering the toolbar title with a className', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><ToolbarGroupTitle className="my-class-name" text="title" /></ThemeProvider>);
        });
        it('it should render the toolbar group title with specified className on the root element', () => {
            this.wrapper.should.have.className('my-class-name');
        });
    });

    describe('when rendering the toolbar title with a custom style', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><ToolbarGroupTitle style={{display: 'inline'}} text="title" /></ThemeProvider>);
        });
        it('it should render the Toolbar with the style prop applied to the root element', () => {
            this.wrapper.should.have.style('display', 'inline');
        });
    });
});