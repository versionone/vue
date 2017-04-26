export default [
    {
        title: 'Root Level Provider Example',
        description: 'Example providing a theme and V1 functionality to all VersionOne UI children. This usually' +
        ' is used high in the UI tree.',
        code: require('!raw!./VersionOneUIProvider'),
        component: require('./VersionOneUIProvider').default
    }
];
