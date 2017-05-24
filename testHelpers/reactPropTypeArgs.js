let ReactPropTypesSecretExtraArgs;
try {
    ReactPropTypesSecretExtraArgs = [
        'location',
        'propFullName',
        require('react/lib/ReactPropTypesSecret'),
    ];
} catch (e) {
    ReactPropTypesSecretExtraArgs = [];
}

export default ReactPropTypesSecretExtraArgs;
