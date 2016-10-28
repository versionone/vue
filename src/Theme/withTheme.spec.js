import React, {PropTypes} from 'react';
import {mount} from 'enzyme';
import withTheme from './withTheme';
import ThemeProvider from './ThemeProvider';

suite('withTheme', () => {
    test('wrapping a themed component provides the theme to it as a prop', () => {
        const renderedComponent = mountComponentWithTheme(withTheme()(TestComponent), getTheme());
        expect(componentProps(renderedComponent)).to.deep.equal(getTheme());
    });

    test('wrapping a themed component enables Radium support', () => {
        const renderedComponent = mountComponentWithTheme(withTheme()(TestComponent), getTheme());
        focus(renderedComponent);
        expect(backgroundColorToBe(renderedComponent, 'green')).to.be.true;
    });

    test('props pass through to the wrapped component', () => {
        const renderedComponent = mountComponentWithTheme(withTheme()(TestComponent), getTheme(), {test: true});
        expect(renderedComponent.find('TestComponent').props().test).to.be.true;
    });

    test('the theme is override-able by passing in a partial theme', () => {
        const renderedComponent = mountComponentWithTheme(withTheme(getOverrideTheme())(TestComponent), getTheme(), {test: true});
        expect(componentProps(renderedComponent)).to.deep.equal({
            color: {
                pendingColor: 'green',
                disabledColor: 'gray'
            },
            font: {
                size: 12
            }
        });
    });
});

const TestComponent = () => {
    const styles = {
        base: {
            backgroundColor: 'blue',
            ':hover': {
                backgroundColor: 'green'
            }
        }
    };
    return (
        <h1 style={[styles.base]}>Hello world</h1>
    );
};
TestComponent.propTypes = {theme: PropTypes.object};

function mountComponentWithTheme(Component, theme = {}, props = {}) {
    return mount(<ThemeProvider theme={theme}><Component {...props} /></ThemeProvider>);
}

function getTheme() {
    return {
        color: {
            pendingColor: 'yellow',
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

function componentProps(wrapper) {
    return wrapper.find('TestComponent').props().theme;
}

function focus(wrapper) {
    wrapper.find('h1').simulate('mouseenter');
}

function backgroundColorToBe(wrapper, backgroundColor) {
    return wrapper.find('h1').props().style.backgroundColor === backgroundColor;
}