import sinon from 'sinon';
import gettingStyles from './gettingStyles';

describe('themedComponent', function() {
    describe('given function to consolidate theme values and a function to get styles from theme', () => {
        beforeEach(() => {
            this.getThemeValues = sinon.stub();
            this.getStylesFromTheme = sinon.stub();
        });
        describe('when getting the getStyles', () => {
            beforeEach(() => {
                this.actual = gettingStyles(this.getThemeValues, this.getStylesFromTheme);
            });
            it('it should return a function', () => {
                (typeof this.actual).should.be.equal('function');
            });
        });

        describe('given a component\'s context with a theme, default theme in props, and state', () => {
            describe('when getting the styles for the component', () => {
                beforeEach(() => {
                    this.globalThemeValues = {
                        color: 'blue',
                        backgroundColor: 'blue'
                    };
                    this.themeValues = {
                        color: 'blue',
                        backgroundColor: 'blue'
                    };
                    this.props = {
                        defaultTheme: {
                            color: 'red',
                            padding: '12px'
                        },
                        test: true
                    };
                    this.state = {
                        state: 'something'
                    };
                    this.getThemeValues = sinon.stub().returns(this.themeValues);
                    this.getStylesFromTheme = sinon.stub().returns({
                        color: 'green',
                        background: 'blue',
                        border: '1px solid gray',
                        outline: '1px solid blue'
                    });
                    this.getStyles = gettingStyles(this.getThemeValues, this.getStylesFromTheme);
                    this.actual = this.getStyles({
                        props: this.props,
                        state: this.state,
                        context: {
                            theme: this.globalThemeValues
                        }
                    });
                });
                it('it should reduce the default theme and global theme (context) to a single set of theme values', () => {
                    this.getThemeValues.calledWith(this.themeValues, this.props, this.state).should.be.true;
                });
                it('it should apply the props defaultTheme on top of the reduced theme values to produce a final set of theme values and use this to compute component styles', () => {
                    this.getStylesFromTheme.calledWith({
                        color: 'red',
                        backgroundColor: 'blue',
                        padding: '12px'
                    }, this.props, this.state).should.be.true;
                });
                it('it should compute the component styles using the final set of theme values, props, and state', () => {
                    this.actual.color.should.equal('green');
                    this.actual.background.should.equal('blue');
                    this.actual.border.should.equal('1px solid gray');
                    this.actual.outline.should.equal('1px solid blue');
                });
            });
        });
    });
});