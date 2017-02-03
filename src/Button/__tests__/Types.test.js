import * as ButtonTypes from '../Types';

test('individual button types are exported', () => {
    expect(ButtonTypes.standard).toBeDefined();
    expect(ButtonTypes.basic).toBeDefined();
    expect(ButtonTypes.important).toBeDefined();
    expect(ButtonTypes.alt).toBeDefined();
    expect(ButtonTypes.basicAlt).toBeDefined();
    expect(ButtonTypes.special).toBeDefined();
});
