module.exports = (wallaby) => ({
    compilers: {
        '**/*.js': wallaby.compilers.babel(),
    },
    env: {
        type: 'node',
        runner: 'node',
    },
    files: [
        'packages/**/*.js',
        '!packages/node_modules',
        'package.json',
        'specHelpers/*.js',
        '!packages/**/*.test.js',
        '!packages/**/docs',
        '!packages/**/stories/**/*.*',
    ],
    filesWithNoCoverageCalculated: [
        'specHelpers/**/*.js',
        'packages/Icons/*.js',
    ],
    setup: (w) => {
        w.testFramework.configure(require('./package.json').jest);
    },
    testFramework: 'jest',
    tests: [
        'packages/**/tests/**/*.test.js',
    ],
});
