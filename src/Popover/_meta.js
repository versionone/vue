import examples from './examples';

export default {
    name: 'Popover',
    keywords: ['tooltip', 'drop down menu'],
    readme: require('./README.md'),
    status: 'experimental',
    componentsSources: [
        {
            name: 'Popover',
            code: require('!raw!./Popover')
        }
    ],
    examples
}