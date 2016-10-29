import React, {PropTypes} from 'react';
import {mount} from 'enzyme';
import withTheme from './withTheme';
import ThemeProvider from './ThemeProvider';

suite('withTheme', () => {
    test('the wrapped component maintains the original component\'s display name', () => {
        const wrappedComponent = withTheme()(TestComponent);
        expect(wrappedComponent.displayName).to.equal('TestComponent');
    });

    test('the original component propTypes are applied to the wrapped component', () => {
        const wrappedComponent = withTheme()(TestComponent);
        expect(wrappedComponent.propTypes).to.deep.equal({theme: PropTypes.object});
    });

    test('the original component defaultProps are applied to the wrapped component', () => {
        const wrappedComponent = withTheme()(TestComponent);
        expect(wrappedComponent.defaultProps).to.deep.equal({defaultProp: true});
    });

    test('wrapping a themed component provides the theme to it as a prop', () => {
        const renderedComponent = mountComponentWithTheme(withTheme()(TestComponent), getTheme());
        expect(componentToRenderWithThemeValues(renderedComponent)).to.be.true;
    });

    test('wrapping a themed component enables Radium support', () => {
        const renderedComponent = mountComponentWithTheme(withTheme()(TestComponent), getTheme());
        focus(renderedComponent);
        expect(backgroundColorToBe(renderedComponent, 'green')).to.be.true;
    });

    test('props pass through to the wrapped component', () => {
        const renderedComponent = mountComponentWithTheme(withTheme()(TestComponent), getTheme(), {test: true});
        expect(componentRenderedWithProps(renderedComponent)).to.be.true;
    });

    test('the theme is override-able by passing in a partial theme', () => {
        const renderedComponent = mountComponentWithTheme(withTheme(getOverrideTheme())(TestComponent), getTheme(), {test: true});
        expect(backgroundColorToBe(renderedComponent, 'green')).to.be.true;
    });
});

const TestComponent = (props) => {
    const {color} = props.theme;
    const styles = {
        base: {
            backgroundColor: color.pendingColor,
            ':hover': {
                backgroundColor: 'green'
            },
            color: props.test && 'yellow'
        }
    };
    return (
        <h1 style={[styles.base]}>Hello world</h1>
    );
};
TestComponent.propTypes = {theme: PropTypes.object};
TestComponent.defaultProps = {defaultProp: true};

function mountComponentWithTheme(Component, theme = {}, props = {}) {
    return mount(<ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>);
}

function getTheme() {
    return {
        color: {
            pendingColor: 'blue',
            disabledColor: 'gray'
        }
    };
}

function getOverrideTheme() {
    return {
        color: {
            pendingColor: 'green'
        },
        font: {
            size: 12
        }
    }
}

function componentToRenderWithThemeValues(wrapper) {
    return wrapper.find('h1').props().style.backgroundColor === 'blue';
}

function componentRenderedWithProps(wrapper) {
    return wrapper.find('h1').props().style.color === 'yellow';
}

function focus(wrapper) {
    wrapper.find('h1').simulate('mouseenter');
}

function backgroundColorToBe(wrapper, backgroundColor) {
    return wrapper.find('h1').props().style.backgroundColor === backgroundColor;
}