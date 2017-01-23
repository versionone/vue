process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';

module.exports = function(wallaby) {
    return {
        files: [
            {pattern: 'specSetup.js'},
            {pattern: '**/tmpl/*'},
            {pattern: 'src/**/*.js'},
            {pattern: '!src/**/*.spec.js'},
            {pattern: 'testFixtures/**/*.*'}
        ],
        tests: [
            {pattern: 'src/**/*.spec.js'}
        ],
        compilers: {
            '**/*.js': wallaby.compilers.babel()
        },
        env: {
            type: 'node',
            runner: 'node'
        },
        testFramework: 'mocha',
        bootstrap: function(wallaby) {
            wallaby.testFramework.ui('tdd');
            var path = require('path');
            require('./specSetup');
        },
        debug: true
    };
};
