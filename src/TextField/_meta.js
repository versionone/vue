import examples from './examples';

export default {
    name: 'Text Field',
    keywords: ['input', 'field', 'entry', 'data insertion'],
    'see also': [],
    readme: require('./README.md'),
    status: 'experimental',
    componentsSources: [
        {
            name: 'TextField',
            code: require('!raw!./TextField')
        }
    ],
    examples
};