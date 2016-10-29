export default [
    {
        title: 'ThemeProvider Example - TextField',
        description: 'Example providing a theme to Vue children',
        code: require('!raw!./ThemeProviderExample'),
        component: require('./ThemeProviderExample').default
    },
    {
        title: 'Override Theme Example - TextField',
        description: 'Example overriding the global Vue theme for a specific child component',
        code: require('!raw!./ThemeOverrideExample'),
        component: require('./ThemeOverrideExample').default
    }
];
