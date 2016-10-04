import sinon from 'sinon';
import getTheme from './getTheme';
import gettingStyles from './gettingStyles';

describe('themedComponent', function() {
    describe('given functions to get theme styles, default styles, and the required style of a component', () => {
        beforeEach(() => {
            this.getThemeValues = sinon.stub();
            this.getDefaultStyles = sinon.stub();
            this.getRequiredStyles = sinon.stub();
        });
        describe('when getting the getStyles', () => {
            beforeEach(() => {
                this.actual = gettingStyles(this.getThemeValues, this.getDefaultStyles, this.getRequiredStyles);
            });
            it('it should return a function', () => {
                this.actual.should.be.a.function;
            });
        });
    });
    describe('given the getStyles function', () => {
        describe('given a component\'s context with a theme, props, and state', () => {
            describe('when getting the styles for the component', () => {
                beforeEach(() => {
                    this.theme = {
                        color: 'blue'
                    };
                    this.themeValues = getTheme(this.theme);
                    this.props = {
                        theme: {
                            color: 'red',
                            fontSize: '12px',
                            border: '1px solid black',
                            padding: '12px'
                        },
                        test: true
                    };
                    this.state = {
                        state: 'something'
                    };
                    this.getThemeValues = sinon.stub().withArgs(this.theme, this.props, this.state).returns(this.themeValues);
                    this.getDefaultStyles = sinon.stub().withArgs(this.themeValues, this.props, this.state).returns({
                        color: 'green',
                        background: 'blue',
                        border: '1px solid gray',
                        outline: '1px solid blue'
                    });
                    this.getRequiredStyles = sinon.stub().withArgs(this.themeValues, this.props, this.state).returns({
                        background: 'green',
                        fontSize: '16px'
                    });
                    this.getStyles = gettingStyles(this.getThemeValues, this.getDefaultStyles, this.getRequiredStyles);
                    this.actual = this.getStyles({
                        props: this.props,
                        state: this.state,
                        context: {
                            theme: this.themeValues
                        }
                    });
                });
                it('it should use the computed theme values to combine the default styles and required styles into the final styles output', () => {
                    // Required Styles
                    this.actual.background.should.equal('green');
                    this.actual.fontSize.should.equal('16px');

                    // Default styles
                    this.actual.border.should.equal('1px solid gray');
                    this.actual.color.should.equal('green');
                    this.actual.outline.should.equal('1px solid blue');
                });
            });
        });
    });
});