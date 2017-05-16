export default [
    {
        title: 'Custom V1 Example - AssetLookup',
        description: 'Assumes ThemeProvider has been applied higher up the tree. Provides a hook to inject custom v1 integration with VersionOne UI components.',
        code: require('!raw!./V1ProviderExample'),
        component: require('./V1ProviderExample').default,
    }
];
