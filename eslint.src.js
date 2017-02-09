module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'eslint-config-andrew-codes/base',
        'eslint-config-andrew-codes-react',
        'plugin:react/recommended',
    ],
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        }
    },
    plugins: [
        'babel',
        'import',
        'react',
    ],
    rules: {
        'comma-dangle': [2, {
            arrays: 'always',
            objects: 'always',
            imports: 'never',
            exports: 'never',
        }],
        'comma-style': [2, 'last', {
            exceptions: {
                'ImportDeclaration': true,
            }
        }],
        'linebreak-style': [0, 'windows'],
        'object-curly-newline': [2, {
            minProperties: 1
        }],
        'object-curly-spacing': [2, 'never'],
        'react/no-did-mount-set-state': 0,
        'react/sort-prop-types': [2, {
            'callbacksLast': false,
        }]
    },
    settings: {
        react: {
            pragma: 'React',
            version: '15.0',
        }
    }
};
