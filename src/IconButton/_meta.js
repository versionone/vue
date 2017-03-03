import examples from './examples';

export default {
    name: 'Icon Button',
    keywords: ['basic', 'important', 'alt', 'special', 'icon', 'svg'],
    'see also': ['Button', 'Icons', 'SvgIcon'],
    readme: require('./README.md'),
    status: 'experimental',
    componentsSources: [
        {
            name: 'IconButton',
            code: require('!raw!./IconButton')
        }
    ],
    examples
};
