export default [
    {
        title: 'Simple Examples',
        description: 'Examples demonstrating key features of a ExpectedTextField.',
        code: require('!raw!./SimpleExamples'),
        component: require('./SimpleExamples').default
    },
    {
        title: 'Error Examples',
        description: 'These examples demonstrate text fields marked as required and its error state triggered by the existence of error text.',
        code: require('!raw!./ErrorExamples'),
        component: require('./ErrorExamples').default
    }
];
