import SvgIcon from './../';
import SvgIconComponent from '../SvgIcon';

test('a SvgIcon component is exported as default', () => {
    expect(new SvgIcon({})).toBeInstanceOf(SvgIconComponent);
});
