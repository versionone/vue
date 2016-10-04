import React from 'react';
import {mount} from 'enzyme';
import sinon from 'sinon';
import {applyTheme} from './../../specHelpers';
import TextField from './TextField';
import HintText from './../internal/HintText';
import RequiredIndicator from './../internal/RequiredIndicator';
import ErrorMessage from './../internal/ErrorMessage';
import getTheme from './../Theme/getTheme';

describe('<TextField>', function() {
    beforeEach(() => {
        this.actual = undefined;
    });
    describe('when rendering the text field', () => {
        beforeEach(() => {
            this.actual = mount(applyTheme(<TextField />));
        });
        it('it should have a transparent background on the input, so that the hint text background color shows as the field\'s background color', () => {
            this.actual.find('input').parent().should.have.style('backgroundColor', 'transparent');
        });
    });

    describe('given a value', () => {
        beforeEach(() => {
            this.value = 'a value';
        });
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<TextField value={this.value} />));
            });
            it('it should render with the value in the input', () => {
                this.actual.find('input').should.have.value(this.value);
            });
        });
        describe('when typing into the text field', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<TextField value={this.value} />));
                this.actual.find('input').simulate('keydown', {which: 64});
                this.actual.find('input').simulate('keyup', {which: 64});
                this.actual.find('input').simulate('input', {target: {value: 'a'}});
            });
            it('it should use the provided value as the value of the input and not the user typed text', () => {
                this.actual.find('input').should.have.value(this.value);
            });
        });
        describe('given hint text', () => {
            beforeEach(() => {
                this.hintText = 'hint text';
            });
            describe('when rendering the text field', () => {
                beforeEach(() => {
                    this.actual = mount(applyTheme(<TextField value={this.value} hintText={this.hintText} />));
                });
                it('it should hide the hint text', () => {
                    this.actual.find(HintText).children().should.have.style('opacity', '0');
                });
            });
        });
    });
    describe('given no value', () => {
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<TextField />));
            });
            it('it should render a text field with no value', () => {
                this.actual.find('input').should.have.value('');
            });
        });

        describe('given a default value', () => {
            beforeEach(() => {
                this.defaultValue = 'default value';
            });
            describe('when rendering the text field', () => {
                beforeEach(() => {
                    this.actual = mount(applyTheme(<TextField defaultValue={this.defaultValue} />));
                });
                it('it should render with a value equal to the default value', () => {
                    this.actual.find('input').should.have.value(this.defaultValue);
                });
            });

            describe('given hint text', () => {
                beforeEach(() => {
                    this.hintText = 'hint text';
                });
                describe('when rendering the text field', () => {
                    beforeEach(() => {
                        this.actual = mount(applyTheme(<TextField defaultValue={this.defaultValue}
                                                                  hintText={this.hintText} />));
                    });
                    it('it should hide the hint text', () => {
                        this.actual.find(HintText).children().should.have.style('opacity', '0');
                    });
                });
                describe('when deleting all text from the input', () => {
                    beforeEach(() => {
                        this.actual = mount(applyTheme(<TextField defaultValue={this.defaultValue}
                                                                  hintText={this.hintText} />));
                        this.actual.find('input').simulate('change', {target: {value: ''}});
                    });
                    it('it should show the hint text', () => {
                        this.actual.find(HintText).children().should.have.style('opacity', '1');
                        this.actual.find(HintText).should.have.text(this.hintText);
                    });
                });
            });
        });

        describe('given no default value', () => {
            describe('given hint text', () => {
                beforeEach(() => {
                    this.hintText = 'hint text';
                });
                describe('when rendering the text field', () => {
                    beforeEach(() => {
                        this.actual = mount(applyTheme(<TextField hintText={this.hintText} />));
                    });
                    it('it should show the hint text', () => {
                        this.actual.find(HintText).children().should.have.style('opacity', '1');
                        this.actual.find(HintText).should.have.text(this.hintText);
                    });
                });
                describe('when typing into the input field', () => {
                    beforeEach(() => {
                        this.actual = mount(applyTheme(<TextField hintText={this.hintText} />));
                        this.actual.find('input').simulate('change', {target: {value: 'a'}});
                    });
                    it('it should hide the hint text', () => {
                        this.actual.find(HintText).children().should.have.style('opacity', '0');
                    });
                });
                describe('when re-rendering the text field with a value', () => {
                    beforeEach(() => {
                        this.value = 'I am a value';
                        this.context = {
                            theme: getTheme()
                        };
                        this.actual = mount(<TextField hintText={this.hintText} />, {context: this.context});
                        this.actual.setProps({value: this.value});
                    });

                    it('it should set the state that the text field has a value', () => {
                        this.actual.state('hasValue').should.be.true;
                    });
                });
            });
            describe('given a multi-line length hint text value (72px tall)', () => {
                beforeEach(() => {
                    this.context = {
                        theme: getTheme()
                    };
                    this.actual = mount(<TextField
                        hintText="fake content that is '72px' tall" />, {context: this.context})
                        .setState({hintTextHeight: 72});
                });
                describe('when rendering the text field', () => {
                    it('it should auto adjust the height of the text field to accommodate the extra long hint text', () => {
                        this.actual.find('input').parent().should.have.style('marginTop', '37px');
                    });
                });
                describe('when I click on the hint text', () => {
                    beforeEach(() => {
                        this.focus = sinon.spy();
                        this.actual = mount(applyTheme(<TextField
                            hintText="hint text is super duper long, so long in fact, that it just may be unbelievable"
                            onFocus={this.focus} />));
                        this.actual.find(HintText).simulate('click');
                    });
                    it('it should focus the input of the text field', () => {
                        should.equal(this.actual.find('input').node, document.activeElement);
                    });
                });
            });
        });
    });

    describe('given an change event handler', () => {
        beforeEach(() => {
            this.change = sinon.spy();
        });
        describe('when typing text into the text field', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<TextField onChange={this.change} />));
                this.actual.find('input').simulate('change', {target: {value: 'a'}});
            });
            it('it should execute the onChange callback with the new value of the field', () => {
                this.change.calledWith('a').should.be.true;
            });
        });
    });

    describe('given a specified width', () => {
        beforeEach(() => {
            this.width = 250;
        });
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<TextField width={this.width} />));
            });
            it('it should render the text field with the specified width in pixels', () => {
                this.actual.find(HintText).should.have.style('width', `${this.width}px`);
                this.actual.find('input').parent().should.have.style('width', `${this.width}px`);
            });
        });

        describe('given full width rendering', () => {
            describe('when rendering the text field', () => {
                beforeEach(() => {
                    this.actual = mount(applyTheme(<TextField width={this.width} fullWidth />));
                });
                it('it should render the text field with 100% width', () => {
                    this.actual.should.have.style('width', '100%');
                });
            });
        });
    });
    describe('given no specified width', () => {
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<TextField />));
            });
            it('it should render the text field with the default width', () => {
                this.actual.find(HintText).should.have.style('width', `${TextField.defaultProps.width}px`);
                this.actual.find('input').parent().should.have.style('width', `${TextField.defaultProps.width}px`);
            });
        });
    });

    describe('given the text field is marked as disabled', () => {
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<TextField disabled />));
            });
            it('it should render the input field as disabled', () => {
                this.actual.find('input').should.be.disabled();
            });
            it('it should render the not-allowed cursor to indicate it is disabled', () => {
                this.actual.find('input').should.have.style('cursor', 'not-allowed');
            });
        });
    });
    describe('given the text field is not marked as disabled', () => {
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<TextField />));
            });
            it('it should not render the input field as disabled', () => {
                this.actual.find('input').should.not.be.disabled();
            });
            it('it should render the not-allowed cursor to indicate it is disabled', () => {
                this.actual.find('input').should.have.style('cursor', 'initial');
            });
        });
    });

    describe('given the text field is marked as required', () => {
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<TextField required />));
            });
            it('it should show the required indicator', () => {
                this.actual.find(RequiredIndicator).should.have.style('opacity', '1');
            });
        });
    });
    describe('given the text field is not marked as required', () => {
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.actual = mount(applyTheme(<TextField />));
            });
            it('it should hide the required indicator', () => {
                this.actual.find(RequiredIndicator).should.have.style('opacity', '0');
            });
        });
    });

    describe('given a focus event handler', () => {
        this.focus = sinon.spy();
        describe('when focusing the text field', () => {
            beforeEach(() => {
                this.theme = {
                    TextField: {
                        focused: {
                            outline: '1px solid blue'
                        }
                    }
                };
                this.actual = mount(applyTheme(<TextField onFocus={this.focus} />, this.theme));
                this.actual.find('input').simulate('focus');
            });
            it('it should call the onFocus event handler prop', () => {
                this.focus.called.should.be.true;
            });
            it('it should render in the focused state', () => {
                this.actual.find(HintText).should.have.style('outline', '1px solid blue');
            });
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
            this.actual = mount(applyTheme(<TextField />, this.theme));
            this.actual.find('input').simulate('focus');
        });
        describe('when losing focus on the text field', () => {
            beforeEach(() => {
                this.actual.find('input').simulate('blur');
            });
            it('it should render in the non-focused state', () => {
                this.actual.find(HintText).should.have.style('outline', TextField.defaultThemeProps.outline);
            });
        });
        describe('given there is an blur event handler', () => {
            beforeEach(() => {
                this.blur = sinon.spy();
                this.actual = mount(applyTheme(<TextField onBlur={this.blur} />, this.theme));
            });
            describe('when losing focus on the text field', () => {
                beforeEach(() => {
                    this.actual.find('input').simulate('blur');
                });
                it('it should call the blur event handler', () => {
                    this.blur.called.should.be.true;
                });
            });
        });
    });

    describe('given no error text', () => {
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.theme = {
                    TextField: {
                        hasError: {
                            outline: '1px solid blue'
                        }
                    }
                };
                this.actual = mount(applyTheme(<TextField />, this.theme));
            });
            it('it should not render the error text', () => {
                should.not.exist(this.actual.find(ErrorMessage).node);
            });
            it('it should not render in the error state', () => {
                this.actual.find(HintText).should.have.style('outline', TextField.defaultThemeProps.outline);
            });
        });
    });
    describe('given error text', () => {
        beforeEach(() => {
            this.errorText = 'error text';
        });
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.theme = {
                    TextField: {
                        hasError: {
                            outline: '1px solid blue'
                        }
                    }
                };
                this.actual = mount(applyTheme(<TextField errorText={this.errorText} />, this.theme));
            });
            it('it should render the error message', () => {
                this.actual.find(ErrorMessage).should.have.text(this.errorText);
            });
            it('it should render in the error state', () => {
                this.actual.find(HintText).should.have.style('outline', '1px solid blue');
            });
        });
    });

    describe('given the text field is marked as pending', () => {
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.theme = {
                    TextField: {
                        pending: {
                            outline: '1px solid yellow'
                        }
                    }
                };
                this.actual = mount(applyTheme(<TextField pending />, this.theme));
            });
            it('it should render the text field in the pending state', () => {
                this.actual.find(HintText).should.have.style('outline', '1px solid yellow');
            });
        });
    });
    describe('given the text field is not marked as pending', () => {
        describe('when rendering the text field', () => {
            beforeEach(() => {
                this.theme = {
                    TextField: {
                        pending: {
                            outline: '1px solid yellow'
                        }
                    }
                };
                this.actual = mount(applyTheme(<TextField />, this.theme));
            });
            it('it should render the text field in the pending state', () => {
                this.actual.find(HintText).should.have.style('outline', TextField.defaultThemeProps.outline);
            });
        });
    });
});
