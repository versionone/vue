process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';

module.exports = function(wallaby) {
    return {
        files: [
            'specSetup.js',
            '**/tmpl/*',
            'src/**/*.js',
            '!src/**/__tests_/*.test.js',
            'testFixtures/**/*.*',
        ],
        tests: [
            'src/**/__tests__/*.test.js',
        ],
        compilers: {
            '**/*.js': wallaby.compilers.babel()
        },
        env: {
            type: 'node',
            runner: 'node'
        },
        testFramework: 'jest',
        setup: function(wallaby) {
            wallaby.testFramework.configure(require('./package.json').jest);
        }
    };
};

