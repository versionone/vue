import React from 'react';
import {mount} from 'enzyme';
import {applyTheme} from './../../specHelpers';
import HintText from './HintText';

describe('<HintText />', function() {
    beforeEach(() => {
        this.actual = undefined;
    });
    describe('when rendering the hint text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<HintText />));
        });
        it('it should render with a transition for opacity in order to fade-in and fade-out', () => {
            this.actual.find('span').should.have.style('transition', 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms');
        });
    });
    describe('when rendering the hint text with text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<HintText text="hint text" />));
        });
        it('it should render the provided text', () => {
            this.actual.should.have.text("hint text");
        });
    });
    describe('when rendering a visible hint text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<HintText hidden={false} />));
        });
        it('it should render the text with an opacity of 1', () => {
            this.actual.find('span').should.have.style('opacity', '1');
        });
    });
    describe('when rendering an invisible hint text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<HintText hidden text="hint text" />));
        });
        it('it should still render the hint text\'s text value', () => {
            this.actual.should.have.text('hint text');
        });
        it('it should render the text with an opacity of 0', () => {
            this.actual.find('span').should.have.style('opacity', '0');
        });
    });
    describe('when rendering with a custom style', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<HintText hidden style={{opacity: 1, color: 'blue', 'transition': 'none'}} />));
        });
        it('it should not override the opacity', () => {
            this.actual.find('span').should.have.style('opacity', '0');
        });
        it('it should not override the transition', () => {
            this.actual.find('span').should.have.style('transition', 'opacity 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms');
        });
        it('it should apply all other custom styles', () => {
            this.actual.should.have.style('color', 'blue');
        });
    });
});
