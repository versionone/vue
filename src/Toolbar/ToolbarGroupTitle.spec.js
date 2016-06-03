import React from 'react';
import {shallow} from 'enzyme';
import ToolbarGroupTitle from './ToolbarGroupTitle';

describe('<ToolbarGroupTitle />', function() {
    describe('when rendering a toolbar group title', () => {
        beforeEach(() => {
            this.wrapper = shallow(<ToolbarGroupTitle text="Title" />);
        });
        it('it should render the text in an h2 element', () => {
            expect(this.wrapper.find('h2').text()).to.equal('Title');
        });
    });

    describe('when rendering the toolbar group title with a className', () => {
        beforeEach(() => {
            this.wrapper = shallow(<ToolbarGroupTitle className="my-class-name" text="title" />);
        });
        it('it should render the toolbar group title with specified className on the root element', () => {
            expect(this.wrapper).to.have.className('my-class-name');
        });
    });

    describe('when rendering the toolbar group title with a custom style', () => {
        beforeEach(() => {
            this.wrapper = shallow(<ToolbarGroupTitle style={{display: 'inline'}} text="title" />);
        });
        it('it should render the Toolbar with the style prop applied to the root element', () => {
            expect(this.wrapper).to.have.style('display', 'inline');
        });
    });
});