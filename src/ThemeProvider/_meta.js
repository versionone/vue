import examples from './examples';

export default {
    name: 'Theme Provider',
    keywords: ['theme', 'custom', 'css', 'style', 'stylesheet', 'visual', 'less', 'scss', 'sass'],
    'see also': ['VueProvider'],
    readme: require('./README.md'),
    status: 'stable',
    componentsSources: [
        {
            name: 'ThemeProvider',
            code: require('!raw!./ThemeProvider')
        }
    ],
    examples
};
