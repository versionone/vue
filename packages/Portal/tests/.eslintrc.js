module.exports = {
    env: {
        browser: true,
        node: true,
    },
    extends: [
        'plugin:react/recommended',
        'eslint-config-andrew-codes/specs',
    ],
    globals: [
        'expect',
        'jest',
        'test',
    ],
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: [
        'babel',
        'import',
        'react',
    ],
    rules: {
        'arrow-parens': [
            2,
            'always',
        ],
        'class-methods-use-this': 0,
        'comma-dangle': 0,
        'import/first': 0,
        'linebreak-style': [
            0, 'windows',
        ],
        'object-curly-newline': [
            2,
            {
                minProperties: 1,
            },
        ],
        'prefer-arrow-callback': 1,
        'react/no-did-mount-set-state': 0,
    },
    settings: {
        react: {
            pragma: 'React',
            version: '15.0',
        },
    },
};
