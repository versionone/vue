import React from 'react';
import {shallow} from 'enzyme';
import ToolbarItem from './ToolbarItem';

describe('<ToolbarItem />', function() {
    describe('when rendering a toolbar item', () => {
        beforeEach(() => {
            this.wrapper = shallow(
                <ToolbarItem label="Label" style={{height: '56px'}}>
                    <button>Hello World</button>
                </ToolbarItem>);
        });
        it('it should render a label with the proper height', () => {
            this.wrapper.find('label').should.have.style('height', '56px');
            this.wrapper.find('label').should.have.style('display', 'flex');
        });
        it('it should render label text that is vertically aligned', () => {
            this.wrapper.find('label').children().first().should.have.style('height', '56px');
            this.wrapper.find('label').children().first().should.have.style('display', 'flex');
            this.wrapper.find('label').children().first().should.have.style('align-items', 'center');
        });
        it('it should render a label that wraps correctly when the toolbart is collapsed', () => {
            this.wrapper.find('label').should.have.style('white-space', 'nowrap');
        });
        it('it should render it\'s children in a container with the proper height and vertical alignment', () => {
            this.wrapper.find('label > div').should.have.style('height', '56px');
            this.wrapper.find('label > div').should.have.style('display', 'flex');
            this.wrapper.find('label > div').should.have.style('align-items', 'center');
        });
    });
});