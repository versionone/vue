import * as ButtonTypes from './Types';

suite('Button Types', () => {
    test('individual button types are exported', () => {
        expect(ButtonTypes.standard).to.not.be.undefined;
        expect(ButtonTypes.basic).to.not.be.undefined;
        expect(ButtonTypes.important).to.not.be.undefined;
        expect(ButtonTypes.alt).to.not.be.undefined;
        expect(ButtonTypes.basicAlt).to.not.be.undefined;
        expect(ButtonTypes.special).to.not.be.undefined;
    });

    test('all button types are exported', () => {
        expect(ButtonTypes.all).to.contain(ButtonTypes.standard);
        expect(ButtonTypes.all).to.contain(ButtonTypes.basic);
        expect(ButtonTypes.all).to.contain(ButtonTypes.important);
        expect(ButtonTypes.all).to.contain(ButtonTypes.alt);
        expect(ButtonTypes.all).to.contain(ButtonTypes.basicAlt);
        expect(ButtonTypes.all).to.contain(ButtonTypes.special);
    });
});
