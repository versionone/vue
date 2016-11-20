import * as ButtonTypes from './Types';

suite('Button Types', () => {
    test('individual button types are exported', () => {
        expect(ButtonTypes.standard).to.not.be.undefined;
        expect(ButtonTypes.basic).to.not.be.undefined;
    });

    test('all button types are exported', () => {
        expect(ButtonTypes.all).to.contain(ButtonTypes.standard);
        expect(ButtonTypes.all).to.contain(ButtonTypes.basic);
    });
});
