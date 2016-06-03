import React from 'react';
import {shallow} from 'enzyme';
import ToolbarGroup from './ToolbarGroup';

describe('<ToolbarGroup />', function() {
    describe('when rendering a toolbar group with a className', () => {
        beforeEach(() => {
            this.wrapper = shallow(<ToolbarGroup className="my-class-name" />);
        });
        it('it should render the Toolbar with specified className on the root element', () => {
            expect(this.wrapper).to.have.className('my-class-name');
        });
    });

    describe('when rendering a toolbar group with a custom style', () => {
        beforeEach(() => {
            this.wrapper = shallow(<ToolbarGroup style={{display: 'inline'}} />);
        });
        it('it should render the Toolbar with the style prop applied to the root element', () => {
            expect(this.wrapper).to.have.style('display', 'inline');
        });
    });

    describe('given children', () => {
        beforeEach(() => {
            this.children = [<div></div>, <span></span>];
        });
        describe('when rendiner a toolbar group', () => {
            beforeEach(() => {
                this.wrapper = shallow(<ToolbarGroup>{this.children}</ToolbarGroup>);
            });

            it('it should render each child as a list item within an ordered list', () => {
                expect(this.wrapper.find('ol')).to.not.be.undefined;
                expect(this.wrapper.find('ol > li').length).to.equal(2);
                expect(this.wrapper.find('ol > li').first()).to.contain(<div />);
                expect(this.wrapper.find('ol > li').last()).to.contain(<span />);
            });
        });

        describe('when rendering a toolbar group with a custom item style', () => {
            beforeEach(() => {
                this.wrapper = shallow(<ToolbarGroup itemStyle={{display: 'inline'}}>{this.children}</ToolbarGroup>);
            });
            it('it should render the each toolbar item with the custom style', () => {
                this.wrapper.find('ol > li').forEach((node) => {
                    expect(node).to.have.style({display: 'inline'});
                });
            });
        });
    });
});