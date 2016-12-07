import style from './style';

suite('style PropType', () => {
    test('invalid CSS styles are considered invalid', () => {
        const incorrect = style(getProps(), 'incorrect', 'My Custom Component');
        expect(isAnError(incorrect, 'Prop `incorrect` passed to `My Custom Component`. Has invalid keys backgroundLineColor')).to.be.true;

        const noStyles = style(getProps(), 'noStyles', 'My Custom Component');
        expect(isNotError(noStyles)).to.be.true;

        const correct = style(getProps(), 'correct', 'My Custom Component');
        expect(isNotError(correct)).to.be.true;
    });
});

function getProps() {
    return {
        correct: {background: 'blue'},
        incorrect: {backgroundLineColor: 'blue'}
    };
}

function isAnError(input, message) {
    return (input instanceof Error) === true && input.message === message;
}

function isNotError(input) {
    return input === null;
}
