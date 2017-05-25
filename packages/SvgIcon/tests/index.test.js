import SvgIcon from './../src';
import SvgIconComponent from './../src/SvgIcon';

test('a SvgIcon component is exported as default', () => {
    expect(new SvgIcon({})).toBeInstanceOf(SvgIconComponent);
});
