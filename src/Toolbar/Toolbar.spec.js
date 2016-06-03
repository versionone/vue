import React from 'react';
import {shallow} from 'enzyme';
import Toolbar from './Toolbar';

describe('<Toolbar />', function() {
    describe('when rendering a Toolbar with no title', () => {
        beforeEach(() => {
            this.wrapper = shallow(<Toolbar />);
        });

        it('it should not render a title', () => {
            this.wrapper.find('h1').length.should.equal(0);
        });
    });
    describe('when rendering a Toolbar with a title', () => {
        beforeEach(() => {
            this.wrapper = shallow(<Toolbar title="Toolbar Title" />);
        });

        it('it should render the title in a h1', () => {
            this.wrapper.find('h1').length.should.equal(1);
            this.wrapper.find('h1').text().should.equal('Toolbar Title');
        });
    });

    describe('when rendering a Toolbar with a title and a custom title style', () => {
        beforeEach(() => {
            this.wrapper = shallow(<Toolbar title="Toolbar Title" titleStyle={{display: 'none'}} />);
        });
        it('it should render the Toolbar with the titleStyle prop applied to the title', () => {
            expect(this.wrapper.find('h1')).to.have.style('display', 'none');
        });
    });

    describe('when rendering a toolbar with a className', () => {
        beforeEach(() => {
            this.wrapper = shallow(<Toolbar className="my-class-name" />);
        });
        it('it should render the Toolbar with specified className on the root element', () => {
            this.wrapper.find('.toolbar').hasClass('my-class-name');
        });
    });

    describe('when rendering a toolbar with a custom style', () => {
        beforeEach(() => {
            this.wrapper = shallow(<Toolbar style={{display: 'inline'}} titleStyle={{display: 'none'}} />);
        });
        it('it should render the Toolbar with the style prop applied to the root element', () => {
            expect(this.wrapper).to.have.style('display', 'inline');
        });
    });

    describe('when rendering a Toolbar with children and a title', () => {
        beforeEach(() => {
            this.wrapper = shallow(
                <Toolbar title="Toolbar Title">
                    <div className="children1"></div>
                    <div className="children2"></div>
                </Toolbar>
            );
        });
        it('it should render the children in a grouping div', () => {
            expect(this.wrapper.childAt(1).children().length).to.equal(2);
            expect(this.wrapper.childAt(1)).to.have.descendants('.children1');
            expect(this.wrapper.childAt(1)).to.have.descendants('.children2');
        });
        it('it should render grouping of children after title', () => {
            expect(this.wrapper.childAt(0).type()).to.equal('h1');
            expect(this.wrapper.childAt(1).type()).to.equal('div');
        });
    });
});