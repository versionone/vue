module.exports = function(wallaby) {
    return {
        files: [
            'src/**/*.js',
            'package.json',
            'specHelpers/*.js',
            '!src/**/*.test.js',
            '!src/**/examples/**/*.*',
            '!src/**/Stories.js',
            '!src/**/_meta.js',
            '!src/**/*.spec.js',
        ],
        tests: [
            'src/**/__tests__/*.test.js',
        ],
        env: {
            type: 'node',
            runner: 'node',
        },
        filesWithNoCoverageCalculated: [
            'specHelpers/**/*.js',
            'src/Icons/*.js'
        ],
        compilers: {
            '**/*.js': wallaby.compilers.babel(),
        },
        testFramework: 'jest',
        setup: function(wallaby) {
            wallaby.testFramework.configure(require('./package.json').jest);
        },
    };
};
