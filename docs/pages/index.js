export default [
    // Foundation pages
    {
        title: 'Colors',
        status: 'experimental',
        menuCategory: 'Foundations',
        component: require('./foundations/V1Colors')
    },
    {
        title: 'Theme',
        status: 'experimental',
        menuCategory: 'Foundations',
        component: require('./foundations/Themes')
    },

    // Patterns pages
    require('./patterns/InlineDialog.md'),
    require('./patterns/Search.md'),

    // Contributing pages
    require('./contributing/Documentation.md'),
    require('./contributing/Components.md'),
    require('./contributing/Theming-Components.md')
];
