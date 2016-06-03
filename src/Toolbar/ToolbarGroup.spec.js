import React from 'react';
import {shallow} from 'enzyme';
import ToolbarGroup from './ToolbarGroup';
import ToolbarSeparator from './ToolbarSeparator';

describe('<ToolbarGroup />', function() {
    describe('when rendering a toolbar group', () => {
        beforeEach(() => {
            this.wrapper = shallow(<ToolbarGroup height={'56px'} />);
        });
        it('it should render it\'s children with the provided height prop', () => {
            this.wrapper.children().forEach((child) => child.should.have.style('height', '56px'))
        });
    });
    describe('when rendering a toolbar group with a className', () => {
        beforeEach(() => {
            this.wrapper = shallow(<ToolbarGroup className="my-class-name" />);
        });
        it('it should render the Toolbar with specified className on the root element', () => {
            this.wrapper.should.have.className('my-class-name');
        });
    });

    describe('when rendering a toolbar group with a custom style', () => {
        beforeEach(() => {
            this.wrapper = shallow(<ToolbarGroup style={{display: 'inline'}} />);
        });
        it('it should render the Toolbar with the style prop applied to the root element', () => {
            this.wrapper.should.have.style('display', 'inline');
        });
    });

    describe('when rendering a toolbar group with children', () => {
        beforeEach(() => {
            this.wrapper = shallow(
                <ToolbarGroup style={{height: '56px'}}>
                    <div></div>
                    <ToolbarSeparator />
                    <div></div>
                </ToolbarGroup>
            );
        });
        it('it should render the children', () => {
            this.wrapper.children().length.should.equal(3);
        });
        it('it should pass the height down to toolbar separator children', () => {
            this.wrapper.children('ToolbarSeparator')
                .forEach((child) => child.should.have.style('height', "56px"))
        });
        it('it should not pass the height down to non toolbar separator children', () => {
            this.wrapper.children()
                .not('ToolbarSeparator')
                .forEach((child) => child.should.not.have.style('height', "56px"))
        });
    });
});