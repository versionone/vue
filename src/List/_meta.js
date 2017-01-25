import examples from './examples';

export default {
    name: 'List',
    keywords: [
        'ordered',
        'unordered'
    ],
    'see also': [],
    readme: require('./README.md'),
    status: 'experimental',
    componentsSources: [
        {
            name: 'List',
            code: require('!raw!./List')
        },
        {
            name: 'ListItem',
            code: require('!raw!./ListItem')
        }
    ],
    examples
};
