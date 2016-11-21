import * as ButtonSizes from './Sizes';

suite('Button Types', () => {
    test('individual button sizes are exported', () => {
        expect(ButtonSizes.small).to.equal(0.75);
        expect(ButtonSizes.normal).to.equal(1);
        expect(ButtonSizes.large).to.equal(1.5);
    });
});
