import React from 'react';
import {mount} from 'enzyme';
import ThemeProvider from './../styles/ThemeProvider';
import ToolbarSpacer from './ToolbarSpacer';

describe('<ToolbarSpacer />', function() {
    describe('when rendering a toolbar spacer', () => {
        beforeEach(() => {
            this.wrapper = mount(<ThemeProvider><ToolbarSpacer /></ThemeProvider>);
        });
        it('it should render a single div separator that expands as wide as there is space available', () => {
            this.wrapper.length.should.equal(1);
            this.wrapper.children().length.should.equal(0);
            this.wrapper.should.have.style('flex', '1');
        });
    });
});