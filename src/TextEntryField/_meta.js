import examples from './examples';

export default {
    name: 'Text Entry Field',
    keywords: ['input', 'data insertion'],
    'see also': ['phone entry field'],
    readme: require('./README.md'),
    status: 'experimental',
    componentsSources: [
        {
            name: 'TextEntryField',
            code: require('!raw!./TextEntryField')
        }
    ],
    examples
}