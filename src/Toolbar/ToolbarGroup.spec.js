import React from 'react';
import {mount} from 'enzyme';
import ThemeProvider from './../Theme';
import ToolbarGroup from './ToolbarGroup';
import ToolbarSeparator from './ToolbarSeparator';
import ToolbarItem from './ToolbarItem';

describe('<ToolbarGroup />', function() {
    describe('when rendering a toolbar group with a className', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><ToolbarGroup className="my-class-name" /></ThemeProvider>);
        });
        it('it should render the Toolbar with specified className on the root element', () => {
            this.wrapper.should.have.className('my-class-name');
        });
    });

    describe('when rendering a toolbar group with a custom style', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><ToolbarGroup style={{color: 'blue'}} /></ThemeProvider>);
        });
        it('it should render the Toolbar with the style prop applied to the root element', () => {
            this.wrapper.should.have.style('color', 'blue');
        });
    });

    describe('when rendering a toolbar group with children', () => {
        beforeEach(() => {
            this.wrapper = mount(
                <ThemeProvider>
                    <ToolbarGroup style={{height: '60px'}}>
                        <ToolbarItem style={{color: 'blue'}} />
                        <ToolbarSeparator style={{color: 'red'}}  />
                        <div style={{color: 'green'}} ></div>
                    </ToolbarGroup>
                </ThemeProvider>
            );
        });
        it('it should render the children', () => {
            this.wrapper.children().length.should.equal(3);
        });
        it('it should pass the height down to toolbar items', () => {
            this.wrapper.childAt(0).should.have.style('height', "60px");
        });
        it('it should pass the height down to toolbar separators', () => {
            this.wrapper.childAt(1).should.have.style('height', "60px");
        });
        it('it should not pass the height down to non toolbar separator children', () => {
            this.wrapper.childAt(2).should.not.have.style('height', "60px");
        });
        it('it should maintain other styles of the children', () => {
            this.wrapper.childAt(0).should.have.style('color', 'blue');
            this.wrapper.childAt(1).should.have.style('color', 'red');
            this.wrapper.childAt(2).should.have.style('color', 'green');
        });
    });
});