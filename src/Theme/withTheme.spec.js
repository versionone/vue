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
        expect(renderedComponent.find('h1').node.style.backgroundColor).to.equal('green');
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

function mountComponentWithTheme(Component, theme = {}) {
    return mount(<ThemeProvider theme={theme}><Component /></ThemeProvider>);
}

function getTheme() {
    return {
        color: {
            pendingColor: 'yellow'
        }
    };
}

function componentProps(wrapper) {
    return wrapper.find('TestComponent').props().theme;
}

function focus(wrapper) {
    wrapper.find('h1').simulate('mouseenter');
}