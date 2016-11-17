import zDepth from './zDepth';

suite('CustomPropTypes/zDepth', () => {
    test('zDepth is between 0 and 5', () => {
        const negativeOne = zDepth(getProps(), 'negativeOne', 'My Custom Component');
        expect(isAnError('Invalid undefined `negativeOne` of value `-1` supplied to `My Custom Component`, expected one of [0,1,2,3,4,5].')).to.be.true;

        const overFive = zDepth(getProps(), 'overFive', 'My Custom Component');
        expect(isAnError('Invalid undefined `negativeOne` of value `6` supplied to `My Custom Component`, expected one of [0,1,2,3,4,5].')).to.be.true;

        const five = zDepth(getProps(), 'five', 'My Custom Component');
        expect(isNotError(five)).to.be.true;

        const zero = zDepth(getProps(), 'zero', 'My Custom Component');
        expect(isNotError(zero)).to.be.true;
    });
});

function getProps() {
    return {
        five: 5,
        negativeOne: -1,
        overFive: 6,
        zero: 0
    };
}

function isAnError(input, message) {
    return input.message === message;
}

function isNotError(input) {
    return input === null;
}
