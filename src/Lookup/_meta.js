import examples from './examples';

export default {
    name: 'Lookup',
    keywords: ['asset lookup'],
    'see also': ['popover', 'list', 'listitem', 'chip'],
    readme: require('./README.md'),
    status: 'experimental',
    componentsSources: [
        {
            name: 'Lookup',
            code: require('!raw!./Lookup')
        }
    ],
    examples
};
