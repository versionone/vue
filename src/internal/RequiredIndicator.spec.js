import React from 'react';
import {mount} from 'enzyme';
import {applyTheme} from './../../specHelpers';
import RequiredIndicator from './RequiredIndicator';

describe('<RequiredIndicator />', function() {
    describe('when rendering a required indicator', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<RequiredIndicator />));
        });
        it('it should render as visible', () => {
            this.actual.should.have.style('opacity', '1');
        });
        it('it should have a transition on its opacity', () => {
            this.actual.should.have.style('transition', 'all 450ms cubic-bezier(0.23, 1, 0.32, 1) 0ms');
        });
    });
    describe('when rendering as hidden', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<RequiredIndicator hidden />));
        });
        it('it should not show the indicator and render it as opacity 0', () => {
            this.actual.should.have.style('opacity', '0');
        });
    });
    describe('when rendering with a custom style', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<RequiredIndicator style={{opacity: '0', color: 'blue'}} />));
        });
        it('it should not override the opacity', () => {
            this.actual.should.have.style('opacity', '1');
        });
        it('it should apply the other styles', () => {
            this.actual.should.have.style('color', 'blue');
        });
    });
});