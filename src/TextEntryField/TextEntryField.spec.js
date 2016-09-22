import React from 'react';
import {mount, shallow} from 'enzyme';
import sinon from 'sinon';
import {applyTheme} from './../../specHelpers';
import TextEntryField from './TextEntryField';
import HintText from './../internal/HintText';
import ErrorMessage from './../internal/ErrorMessage';

describe('<TextEntryField>', function() {
    beforeEach(() => {
        this.actual = undefined;
    });
    describe('when rendering the text field', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField />));
        });
        it('it should render an input with a cursor indicating it is editable', () => {
            this.actual.find('input').should.have.style('cursor', 'initial');
        });
        it('it should render a text field with no value', () => {
            this.actual.find('input').should.have.value('');
        });
        it('it should hide the required indicator', () => {
            this.actual.find('RequiredIndicator').props().hidden.should.be.true;
        });
        it('it should not auto-adjust its height', () => {
            this.actual.should.have.style('marginTop', '0px');
        });
        it('should use the background color of the hint text as the background of the text field', () => {
            this.actual.find('input').parent().should.have.style('backgroundColor', 'transparent');
        });
    });
    describe('when rendering without a value and with hint text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField hintText="hint text" />));
        });
        it('it should render a text field with the specified hint text', () => {
            this.actual.find('HintText').props().text.should.equal('hint text');
        });
    });
    describe('when rendering without a value and with a very long hint text', () => {
        beforeEach(() => {
            this.actual = shallow(applyTheme(<TextEntryField
                hintText="hint text is super duper long, so long in fact, that it just may be unbelievable" />));
            this.mountedActual = mount(applyTheme(<TextEntryField
                hintText="hint text is super duper long, so long in fact, that it just may be unbelievable" />));
        });
        it('it should place the text above the field by taking it\'s height and subtracting the line-height of the field', () => {
            this.actual.find('HintText').first().should.have.style({top: '-48px'});
        });
        it.skip('it should auto adjust the height of the text field to accommodate the extra long hint text', () => {
            this.mountedActual.setState({hintTextHeight: 72}).should.have.style('marginTop', '24px');
        });
    });
    describe('when rendering with hint text and custom hint text styles', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField hintText="I should be blue"
                                                           theme={{
                                                               hintTextColor: 'blue'
                                                           }} />));
        });
        it('it should not override the position of the hint text', () => {
            this.actual.find('HintText').should.have.style('position', 'absolute');
        });
        it('it should not override the top offset of the hint text', () => {
            this.actual.find('HintText').should.have.style('top', '0px');
        });
        it('it should pass the other styles to the HintText', () => {
            this.actual.find('HintText').props().style.should.contain({color: 'blue'});
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
            this.actual.find('HintText').props().hidden.should.be.true;
        });
    });
    describe('given I have no value set and have hint text', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField hintText="hint text" />));
        });
        describe('when I type into the text field', () => {
            beforeEach(() => {
                this.actual.find('input').simulate('change', {target: {value: 'a'}});
            });
            it('it should hide the hint text', () => {
                this.actual.find('HintText').props().hidden.should.be.true;
            });
        });
    });
    describe('given I have no value set and have hint text and I have typed a value into the field', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField hintText="hint text" />));
        });
        describe('when I delete the entire value of the text field', () => {
            beforeEach(() => {
                this.actual.find('input').simulate('keyUp', {target: {value: ''}});
            });
            it('it should show the hint text', () => {
                this.actual.find('HintText').props().hidden.should.be.false;
            });
        });
    });
    describe('given I have hint text that is multiple lines long', () => {
        beforeEach(() => {
            this.onFocus = sinon.spy();
            this.actual = mount(applyTheme(<TextEntryField
                hintText="int text is super duper long, so long in fact, that it just may be unbelievable"
                onFocus={this.onFocus} />));
        });
        describe('when I click on the hint text', () => {
            beforeEach(() => {
                this.actual.find('HintText').simulate('click');
            });
            it('it should show focus the input of the text field', () => {
                should.equal(this.actual.find('input').node, document.activeElement);
            });
            it('it should call the onFocus event handler prop', () => {
                this.onFocus.called.should.be.true;
            });
        });
    });
    describe('when typing text into the text field', () => {
        beforeEach(() => {
            this.handleChange = sinon.spy();
            this.actual = mount(applyTheme(<TextEntryField onChange={this.handleChange} />));
            this.actual.find('input').simulate('change', {target: {value: 'a'}});
        });
        it('it should execute the onChange callback with the new value of the field', () => {
            this.handleChange.calledWith('a').should.be.true;
        });
    });
    describe('when rendering with a set width', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField width={250} />));
        });
        it('it should render the text field with the specified width in pixels', () => {
            this.actual.find(HintText).should.have.style('width', '250px');
            this.actual.find('input').parent().should.have.style('width', '250px');
        });
    });
    describe('when rendering without a set width', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField />));
        });
        it('it should render the text field with the default width', () => {
            this.actual.find(HintText).should.have.style('width', '256px');
            this.actual.find('input').parent().should.have.style('width', '256px');
        });
    });
    describe('when rendering full width and providing a set width', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField width={250} fullWidth />));
        });
        it('it should render the text field with 100% width', () => {
            this.actual.should.have.style('width', '100%');
        });
    });
    describe('when rendering a disabled text field', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField disabled />));
        });
        it('it should render the input field as disabled', () => {
            this.actual.find('input').should.be.disabled();
        });
        it('it should render the not-allowed cursor to indicate it is disabled', () => {
            this.actual.find('input').should.have.style('cursor', 'not-allowed');
        });
    });
    describe('when rendering the field as required', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField required />));
        });
        it('it should show the required indicator', () => {
            this.actual.find('RequiredIndicator').props().hidden.should.be.false;
        });
        it('it should show the required indicator to the right of the field', () => {
            this.actual.find('RequiredIndicator').props().style.should.contain({});
        });
    });
    describe('given a focus event handler prop', () => {
        beforeEach(() => {
            this.onFocus = sinon.spy();
        });
        describe('when focusing on the text field', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<TextEntryField onFocus={this.onFocus} />));
                this.actual.find('input').simulate('focus');
            });
            it('it should call the event handler', () => {
                this.onFocus.called.should.be.true;
            });
        });
    });
    describe('when focusing on the text field', () => {
        beforeEach(() => {
            this.theme = {
                TextField: {
                    focused: {
                        outline: '1px solid blue'
                    }
                }
            };
            this.actual = mount(applyTheme(<TextEntryField />, this.theme));
            this.actual.find('input').simulate('focus');
        });
        it('it should render in the focused state', () => {
            this.actual.find('HintText').should.have.style('outline', '1px solid blue');
        });
    });
    describe('given I am focused on the text field', () => {
        beforeEach(() => {
            this.theme = {
                TextField: {
                    focused: {
                        outline: '1px solid blue'
                    }
                }
            };
            this.actual = mount(applyTheme(<TextEntryField />, this.theme));
            this.actual.find('input').simulate('focus');
        });
        describe('when blurring the text field', () => {
            beforeEach(() => {
                this.actual.find('input').simulate('blur');
            });
            it('it should render in the non-focused state', () => {
                this.actual.find('HintText').should.have.style('outline', TextEntryField.defaultThemeProps.outline);
            });
        });
        describe('given there is an onBlur prop', () => {
            beforeEach(() => {
                this.onBlur = sinon.spy();
                this.actual = mount(applyTheme(<TextEntryField onBlur={this.onBlur} />, this.theme));
            });
            describe('when blurring the text field', () => {
                beforeEach(() => {
                    this.actual.find('input').simulate('blur');
                });
                it('it should call the onBlur prop', () => {
                    this.onBlur.called.should.be.true;
                });
            });
        });
    });
    describe('when rendering with an error message', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField errorText="required" />, this.theme));
        });
        // Where? top, below, right/left, etc?
        it('it should render the error message to the right of the input field', () => {
           this.actual.find(ErrorMessage).should.have.text('required');
            this.actual.find(ErrorMessage).props().hidden.should.be.false;
        });
    });
    describe('when rendering without an error message', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextEntryField />, this.theme));
        });
        // Where? top, below, right/left, etc?
        it('it should render an invisible, blank error message', () => {
           this.actual.find(ErrorMessage).should.have.text('');
            this.actual.find(ErrorMessage).props().hidden.should.be.true;
        });
    });
    describe('when rendering a text field that is in a pending state', () => {
        beforeEach(() => {
            this.theme = {
                TextField: {
                    pending: {
                        backgroundColor: 'yellow'
                    }
                }
            };
            this.actual = mount(applyTheme(<TextEntryField pending />, this.theme));
        });
        it('it should render the text field with the pending state styles', () => {
            this.actual.find('HintText').should.have.style('backgroundColor', 'yellow');
        });
    });
});
