import React from 'react';
import {componentType} from './PropTypes';
import {Toolbar, ToolbarGroup} from './../Toolbar';

describe('utilities/PropTypes/componentType', function() {
    beforeEach(() => {
        this.actual = undefined;
        this.input = undefined;
    });
    describe('given a single component class', () => {
        beforeEach(() => {
            this.input = Toolbar;
        });
        describe('and given a non-children prop that does not match the component class', () => {
            beforeEach(() => {
                this.props = {
                    prop: ToolbarGroup
                };
            });
            describe('when validating that the prop is an instance of the provided component class', () => {
                beforeEach(() => {
                    this.actual = componentType(this.input)(this.props, 'prop', 'My Custom Component');
                });
                it('it should return an error', () => {
                    expect(this.actual).to.be.an.instanceOf(Error);
                    expect(this.actual.message).to.eql('`My Custom Component` prop, `prop`, should be a `Toolbar` component. Check the render method of `My Custom Component`');
                });
            });
        });

        describe('and given a non-children prop that matches the component class', () => {
            beforeEach(() => {
                this.props = {
                    prop: Toolbar
                };
            });
            describe('when validating that the prop is an instance of the provided component class', () => {
                beforeEach(() => {
                    this.actual = componentType(this.input)(this.props, 'prop', 'My Custom Component');
                });
                it('it should not return an error', () => {
                    expect(this.actual).to.equal(undefined);
                });
            });
        });

        describe('and given children that do not all match the component class', () => {
            beforeEach(() => {
                this.props = {
                    children: [React.createElement(Toolbar), React.createElement(ToolbarGroup)]
                }
            });
            describe('when validating that all the children are instances of the provided component class', () => {
                beforeEach(() => {
                    this.actual = componentType(this.input)(this.props, 'children', 'My Custom Component');
                });
                it('it should return an error', () => {
                    expect(this.actual).to.be.an.instanceOf(Error);
                    expect(this.actual.message).to.equal('`My Custom Component` is only allowed children that are `Toolbar` components. Check the render method of `My Custom Component`');
                });
            });
        });

        describe('and given children that all match the component class', () => {
            beforeEach(() => {
                this.props = {
                    children: [React.createElement(Toolbar), React.createElement(Toolbar)]
                }
            });
            describe('when validating that all the children are instances of the provided component class', () => {
                beforeEach(() => {
                    this.actual = componentType(this.input)(this.props, 'children', 'My Custom Component');
                });
                it('it should return an error', () => {
                    expect(this.actual).to.equal(undefined);
                });
            });
        });
    });
});
