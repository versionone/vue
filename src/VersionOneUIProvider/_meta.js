import examples from './examples';

export default {
    name: 'VersionOne UI Provider',
    keywords: ['theme', 'custom', 'css', 'style', 'stylesheet', 'visual', 'less', 'scss', 'sass', 'root', 'v1', 'meta', 'filter', 'token'],
    'see also': [],
    readme: require('./README.md'),
    status: 'stable',
    componentsSources: [
        {
            name: 'VersionOneUIProvider',
            code: require('!raw!./VersionOneUIProvider')
        }
    ],
    examples
};
