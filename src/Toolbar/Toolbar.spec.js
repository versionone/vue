import React from 'react';
import { mount } from 'enzyme';
import Toolbar from './Toolbar';
import {spy} from 'sinon';

describe('<Toolbar />', function() {
    it('it calls componentDidMount', () => {
        this.componentDidMount = spy(Toolbar.prototype, 'componentDidMount');
        this.wrapper = mount(<Toolbar />);
        this.componentDidMount.called.should.be.true;
    });
});