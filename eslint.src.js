module.exports = {
    env: {
        browser: true,
        mocha: true,
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
        'linebreak-style': [0, 'windows'],
        'object-curly-spacing': [2, 'always'],
        'react/no-did-mount-set-state': 0,
    },
    settings: {
        react: {
            pragma: 'React',
            version: '15.0',
        }
    }
};
