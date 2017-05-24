module.exports = {
    env: {
        node: true,
    },
    extends: [
        'eslint-config-andrew-codes/base',
    ],
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module',
    },
    plugins: [
        'babel',
    ],
    rules: {
        'arrow-parens': [
            2,
            'always',
        ],
        'comma-dangle': [
            2,
            {
                arrays: 'always',
                objects: 'always',
                imports: 'never',
                exports: 'never',
            },
        ],
        'comma-style': [
            2,
            'last',
            {
                exceptions: {
                    ImportDeclaration: true,
                },
            },
        ],
        'import/prefer-default-export': 0,
        'import/no-commonjs': 0,
        'import/no-dynamic-require': 0,
        'import/no-extraneous-dependencies': 0,
        'import/no-nodejs-modules': 0,
        'linebreak-style': [
            0,
            'windows',
        ],
        'max-len': 0,
        'max-lines': 0,
        "no-console": 0,
        "no-magic-numbers": 0,
        'no-nodejs': 0,
        'object-curly-newline': [
            2,
            {
                minProperties: 1,
            },
        ],
        'object-curly-spacing': [
            2,
            'never',
        ],
    },
};
