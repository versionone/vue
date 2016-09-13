import React from 'react';
import {mount} from 'enzyme';
import Toolbar from './Toolbar';
import ThemeProvider, {getTheme} from './../Theme';

describe('<Toolbar />', function() {
    describe('when rendering a toolbar without specifying the height', () => {
        beforeEach(() => {
            this.theme = getTheme();
            this.wrapper = mount(<ThemeProvider theme={this.theme}><Toolbar /></ThemeProvider>);
        });
        it('it should use the default height of the theme', () => {
            this.wrapper.should.have.style('height', `${this.theme.Toolbar.height}px`);
        });
    });

    describe('when rendering a toolbar with a specified height', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><Toolbar height="100px" /></ThemeProvider>);
        });
        it('it should use the style height for the Toolbar\'s height', () => {
            this.wrapper.should.have.style('height', '100px');
        });
    });

    describe('when rendering a toolbar with a specified background', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><Toolbar background="green" /></ThemeProvider>);
        });
        it('it should use the style height for the Toolbar\'s height', () => {
            this.wrapper.should.have.style('background', 'green');
        });
    });

    describe('when rendering a toolbar with a className', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><Toolbar className="my-class-name" /></ThemeProvider>);
        });
        it('it should render the toolbar with specified className on the root element', () => {
            this.wrapper.find('.toolbar').should.have.className('my-class-name');
        });
    });

    describe('when rendering a toolbar with a custom style', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><Toolbar style={{display: 'inline'}} /></ThemeProvider>);
        });
        it('it should render the toolbar with the style prop applied to the root element', () => {
            this.wrapper.should.have.style('display', 'inline');
        });
    });

    describe('when rendering a toolbar with children', () => {
        beforeEach(() => {
            this.wrapper = mount(
                <ThemeProvider>
                    <Toolbar title="Toolbar Title" height="100px" background="green">
                        <div style={{color: 'blue'}}></div>
                        <div></div>
                        <div style={{background: 'blue'}}></div>
                    </Toolbar>
                </ThemeProvider>
            );
        });
        it('it should render the children', () => {
            this.wrapper.children().length.should.equal(3);
        });
        it('it should render the children with the toolbar\'s height', () => {
            this.wrapper.find('.toolbar').children().forEach((child)=> child.should.have.style('height', '100px'));
        });
        it('it should maintain the styles of the children', () => {
            this.wrapper.find('.toolbar').children().first().should.have.style('color', 'blue');
        });
    });
});