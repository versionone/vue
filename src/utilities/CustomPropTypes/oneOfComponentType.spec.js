import oneOfComponentType from './oneOfComponentType';

suite('CustomPropTypes/componentType', () => {
    test('it validates a non-children property to match the provided Component type', () => {
        const matchingType = getMatchingType();
        const actualWithError = oneOfComponentType([matchingType])(getProps(), 'incorrectProp', 'My Custom Component');
        console.log(actualWithError)
        expect(isAnError(actualWithError, '`My Custom Component` prop, `incorrectProp`, should be one of the following component types: `TextField`. Check the render method of `My Custom Component`')).to.be.true;

        const correctType = oneOfComponentType([matchingType])(getProps(), 'correctProp', 'My Custom Component');
        expect(isNotError(correctType)).to.be.true;
    });

    test.skip('it validates children to ensure they all match the provided Component type', () => {
        const matchingType = getMatchingType();
        const actualWithError = componentType(matchingType)(getProps(), 'children', 'My Custom Component');
        // expect(isAnError(actualWithError, '')).to.be.true;
    });
});

function getMatchingType() {
    return {
        name: 'TextField'
    };
}

function getProps() {
    return {
        incorrectProp: 'prop',
        correctProp: {
            name: 'TextField'
        }
    }
}

function isAnError(input, message) {
    return (input instanceof Error) === true && input.message === message;
}

function isNotError(input) {
    return input === null;
}
