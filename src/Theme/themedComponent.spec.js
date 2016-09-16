import React, {PropTypes, Component} from 'react';
import sinon from 'sinon';
import {mount} from 'enzyme';
import getTheme from './getTheme';
import ThemeProvider from './ThemeProvider';
import themedComponent from './themedComponent';

describe('themedComponent', function() {
    describe('given functions to get theme styles, default styles, and the required style of a component', () => {
        beforeEach(() => {
            this.theme = {
                color: 'blue'
            };
            this.themeFromProvider = getTheme(this.theme);
            this.props = {
                styles: {
                    fontSize: '12px',
                    border: '1px solid black',
                    padding: '12px'
                },
                test: true
            };
            this.state = {
                state: 'something'
            };
            this.themeStyles = {
                color: 'blue'
            };
            this.getThemeStyles = sinon.stub().returns(this.themeStyles);
            this.getDefaultStyles = sinon.stub().returns({
                color: 'green',
                background: 'blue',
                border: '1px solid gray',
                outline: '1px solid blue'
            });
            this.getRequiredStyles = sinon.stub().returns({
                background: 'green',
                fontSize: '16px'
            });
        });
        describe('given a Component', () => {
            describe('when calling the augmenting the Component and render with the component\'s getStyles function', () => {
                beforeEach(() => {
                    this.actualComponent = themedComponent(this.getThemeStyles, this.getDefaultStyles, this.getRequiredStyles)(TestComponent);
                    this.actual = mount(<ThemeProvider theme={this.themeFromProvider}>
                        <this.actualComponent styles={this.props.styles}
                                              test={true} />
                    </ThemeProvider>);
                });
                it('it should provide the Component\'s default theme values, theme, props, and state to the getThemeStyles function', () => {
                    this.getThemeStyles.calledWith(
                        TestComponent.defaultThemeProps,
                        this.themeFromProvider,
                        this.props,
                        this.state
                    ).should.be.true
                });
                it('it should provide the component\'s props, state, and styles from the getThemeStyles to getDefaultStyles', () => {
                    this.getDefaultStyles.calledWith(this.themeStyles, this.props, this.state).should.be.true;
                });
                it('it should provide the component\'s props, state, and styles from the getThemeStyles to getRequiredStyles', () => {
                    this.getRequiredStyles.calledWith(this.themeStyles, this.props, this.state).should.be.true;
                });
                it('it apply and override styles in the following order: default styles, prop styles, required styles', () => {
                    // Required Styles
                    this.actual.should.have.style('background', 'green');
                    this.actual.should.have.style('fontSize', '16px');

                    // Custom Styles
                    this.actual.should.have.style('border', '1px solid black');
                    this.actual.should.have.style('padding', '12px');

                    // Default styles
                    this.actual.should.have.style('color', 'green');
                    this.actual.should.have.style('outline', '1px solid blue');
                });
            });
        });
    });
});

class TestComponent extends Component {
    static contextTypes = {
        theme: PropTypes.object
    };

    static defaultThemeProps = {
        padding: '10px'
    };

    state = {
        state: 'something'
    };

    render() {
        const styles = this.getStyles(this);
        return (
            <div style={styles}>Test Component</div>
        );
    }
}