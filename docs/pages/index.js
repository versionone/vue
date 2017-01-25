export default [
    // Foundation pages
    {
        title: 'Theme',
        status: 'experimental',
        menuCategory: 'Foundations',
        component: require('./foundations/Themes')
    },
    {
        title: 'Icons',
        status: 'experimental',
        menuCategory: 'Foundations',
        component: require('./foundations/Icons')
    },

    // Patterns pages
    require('./patterns/InlineDialog.md'),
    require('./patterns/Search.md'),

    // Contributing pages
    require('./contributing/Documentation.md'),
    require('./contributing/Components.md'),
    require('./contributing/Theming-Components.md')
];
