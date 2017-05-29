export default [
    // Foundation pages
    {
        menuTitle: 'Foundations',
        pages: [
            require('./foundations/Theme'),
            require('./foundations/Icons'),
        ],
    },

    // Contributing pages
    {
        menuTitle: 'Contributing',
        pages: [
            require('./contributing/Documentation.md'),
            require('./contributing/Components.md'),
            require('./contributing/Theme-Enabled-Components.md'),
            require('./contributing/Publishing.md'),
        ]
    }
];
