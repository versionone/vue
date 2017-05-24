import style from '../../src/CustomPropTypes/style';

test('invalid CSS styles are considered invalid', () => {
    const incorrect = style(getProps(), 'incorrect', 'My Custom Component');
    expect(isAnError(incorrect, 'Prop `incorrect` passed to `My Custom Component`. Has invalid keys backgroundLineColor')).toBeTruthy();

    const noStyles = style(getProps(), 'noStyles', 'My Custom Component');
    expect(isNotError(noStyles)).toBeTruthy();

    const correct = style(getProps(), 'correct', 'My Custom Component');
    expect(isNotError(correct)).toBeTruthy();
});

function getProps() {
    return {
        correct: {
            background: 'blue',
        },
        incorrect: {
            backgroundLineColor: 'blue',
        }
    };
}

function isAnError(input, message) {
    return (input instanceof Error) === true && input.message === message;
}

function isNotError(input) {
    return input === null;
}
