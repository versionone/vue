import React from 'react';
import {shallow} from 'enzyme';
import Toolbar from './Toolbar';
import ToolbarGroup from './ToolbarGroup';
import ToolbarSeparator from './ToolbarSeparator';

describe('<Toolbar />', function() {
    describe('when rendering a toolbar without specifying the height style', () => {
        beforeEach(() => {
            this.wrapper = shallow(<Toolbar />);
        });
        it('it should use the default height of 56px', () => {
            this.wrapper.should.have.style('height', '56px');
        });
    });

    describe('when rendering a toolbar with a specified height', () => {
        beforeEach(() => {
            this.wrapper = shallow(<Toolbar style={{height: '100px'}} />);
        });
        it('it should use the default height of 56px', () => {
           this.wrapper.should.have.style('height', '100px');
        });
    });

    describe('when rendering a toolbar with a className', () => {
        beforeEach(() => {
            this.wrapper = shallow(<Toolbar className="my-class-name" />);
        });
        it('it should render the toolbar with specified className on the root element', () => {
           this.wrapper.find('.toolbar').should.have.className('my-class-name');
        });
    });

    describe('when rendering a toolbar with a custom style', () => {
        beforeEach(() => {
            this.wrapper = shallow(<Toolbar style={{display: 'inline'}} />);
        });
        it('it should render the toolbar with the style prop applied to the root element', () => {
            this.wrapper.should.have.style('display', 'inline');
        });
    });

    describe('when rendering a toolbar with children', () => {
        beforeEach(() => {
            this.wrapper = shallow(
                <Toolbar title="Toolbar Title" style={{height: '56px'}}>
                    <div></div>
                    <div></div>
                    <div></div>
                </Toolbar>
            );
        });
        it('it should render the children', () => {
            this.wrapper.children().length.should.equal(3);
        });
        it('it should render the children with the toolbar\'s height', () => {
            this.wrapper.children().forEach((child)=> child.should.have.style('height', '56px'));
        });
    });
});