import examples from './examples';

export default {
    name: 'AssetLookup',
    keywords: ['asset lookup'],
    'see also': ['popover', 'list', 'listitem', 'chip', 'Lookup'],
    readme: require('./README.md'),
    status: 'experimental',
    componentsSources: [
        {
            name: 'AssetLookup',
            code: require('!raw!./AssetLookup')
        }
    ],
    examples
};
