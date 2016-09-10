import React from 'react';
import {mount} from 'enzyme';
import {applyTheme} from './../../specHelpers';
import TextEntryField from './TextEntryField';

describe('<TextEntryField>', function() {
    describe('when rendering without a value', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField />));
        });
        it('it should render a text field with no value', () => {
            this.actual.find('input').should.have.value('');
        });
    });
    describe('when rendering without a value and with hint text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField hintText="hint text" />));
        });
        it('it should render a text field with the specified hint text', () => {
            this.actual.children('.hint-text').text().should.equal('hint text');
        });
    });
    describe('when rendering without hint text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField />));
        });
        it('it should hide the hint text', () => {
            this.actual.children('.hint-text').should.have.style('opacity', '0');
        });
    });
    describe('when rendering with hint text and custom hint text styles', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField hintText="I should be blue"
                                                           hintTextStyle={{color: 'blue'}} />));
        });
        it('it should override the default hint text styles with the provided styles', () => {
            this.actual.children('.hint-text').should.have.style('color', 'blue');
        });
    });
    describe('when rendering with a value', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField value="a value" hintText="hint text" />));
        });
        it('it should render a text field with the specified value', () => {
            this.actual.find('input').should.have.value('a value');
        });
        it('it should hide the hint text', () => {
            this.actual.children('.hint-text').should.have.style('opacity', '0');
        });
    });
    describe('given I have no value set and have hint text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField hintText="hint text" />))
        });
        describe('when I type into the text field', () => {
            beforeEach(() => {
                this.actual.find('input').simulate('keyUp', {target: {value: 'a'}});
            });
            it('it should hide the hint text', () => {
                this.actual.children('.hint-text').should.have.style('opacity', '0');
            });
        });
    });
    describe('given I have no value set and have hint text and I have typed a value into the field', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField hintText="hint text" />))
        });
        describe('when delete the entire value of the text field', () => {
            beforeEach(() => {
                this.actual.find('input').simulate('keyUp', {target: {value: ''}});
            });
            it('it should show the hint text', () => {
                this.actual.children('.hint-text').should.have.style('opacity', '1');
            });
        });
    });
    describe('when rendering with a set width', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField width={250} />))
        });
        it('it should render the text entry field with the specified width in pixels', () => {
            this.actual.should.have.style('width', '250px');
        });
    });
    describe('when rendering without a set width', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField />))
        });
        it('it should render the text entry field with the default width', () => {
            this.actual.should.have.style('width', '256px');
        });
    });
});
