import examples from './examples';

export default {
    name: 'V1 Provider',
    keywords: ['sdk', 'meta', 'query', 'filter', 'token'],
    'see also': ['VersionOneUIProvider'],
    readme: require('./README.md'),
    status: 'stable',
    componentsSources: [
        {
            name: 'V1Provider',
            code: require('!raw!./V1Provider')
        }
    ],
    examples,
};
