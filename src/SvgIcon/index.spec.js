import SvgIcon from './';
import SvgIconComponent from './SvgIcon';

suite('SvgIcon', () => {
    test('it exports a Button component as the default export', () => {
        expect(new SvgIcon({})).to.be.an.instanceof(SvgIconComponent);
    });
});
