import * as ButtonSizes from '../Sizes';

test('button sizes are exported', () => {
    expect(ButtonSizes.xxSmall).toEqual(0.375);
    expect(ButtonSizes.xSmall).toEqual(0.5);
    expect(ButtonSizes.small).toEqual(0.75);
    expect(ButtonSizes.normal).toEqual(1);
    expect(ButtonSizes.large).toEqual(1.25);
});
