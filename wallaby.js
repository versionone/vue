process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';

module.exports = function(wallaby) {
    return {
        files: [
            {pattern: 'specSetup.js'},
            {pattern: 'specHelpers/**/*.js'},
            {pattern: 'src/**'},
            {pattern: '!src/**/examples/**/*.*'},
            {pattern: '!src/**/Stories.js'},
            {pattern: '!src/**/_meta.js'},
            {pattern: '!src/**/*.spec.js'}
        ],
        tests: [
            {pattern: 'src/**/*.spec.js'}
        ],
        filesWithNoCoverageCalculated: [
            'specSetup.js',
            'specHelpers/**/*.js'
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
            const jsdom = require('jsdom').jsdom;
            global.document = jsdom('<!doctype html><html><body></body></html>');
            global.window = document.defaultView;
            global.navigator = {
                userAgent: 'node.js'
            };
            var path = require('path');
            require('./specSetup');
        },
        debug: true
    };
};
