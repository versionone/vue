import React from 'react';
import {mount} from 'enzyme';
import {applyTheme} from './../../specHelpers';
import ErrorMessage from './ErrorMessage';
import sinon from 'sinon';

describe('<ErrorMessage />', function() {
    beforeEach(() => {
        this.actual = undefined;
    });
    describe('when rendering the error text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<ErrorMessage />));
        });
        it('it should render with a transition for opacity in order to fade-in and fade-out', () => {
            this.actual.find('span').should.have.style('transition', 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms');
        });
    });
    describe('when rendering the error text with an error message text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<ErrorMessage text="required field" />));
        });
        it('it should render the error message with the provided text', () => {
            this.actual.should.have.text('required field');
        });
    });
    describe('when rendering a visible error message', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<ErrorMessage hidden={false} />));
        });
        it('it should render the text with an opacity of 1', () => {
            this.actual.find('span').should.have.style('opacity', '1');
        });
    });
    describe('when rendering an invisible error message text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<ErrorMessage hidden text="required field" />));
        });
        it('it should still render the error message text\'s text value', () => {
            this.actual.should.have.text('required field');
        });
        it('it should render the text with an opacity of 0', () => {
            this.actual.find('span').should.have.style('opacity', '0');
        });
    });
    describe('when rendering with a custom theme', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<ErrorMessage hidden
                                                         defaultTheme={{textColor: 'blue', opacity: '1'}} />));
        });
        it('it should not override the opacity', () => {
            this.actual.find('span').should.have.style('opacity', '0');
        });
        it('it should not override the transition', () => {
            this.actual.find('span').should.have.style('transition', 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms');
        });
        it('it should apply all other custom styles', () => {
            this.actual.find('span').should.have.style('color', 'blue');
        });
    });

    describe('given a implicit, standard event handler', () => {
        beforeEach(() => {
            this.onBlur = sinon.spy();
            this.onClick = sinon.spy();
        });
        describe('when rendering and performing the event related to the handler prop', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<ErrorMessage onClick={this.onClick} onBlur={this.onBlur} />));
                this.actual.simulate('blur');
                this.actual.simulate('click');
            });
            it('it should execute the event handler prop', () => {
                this.onBlur.called.should.be.true;
                this.onClick.called.should.be.true;
            });
        });
    });
});