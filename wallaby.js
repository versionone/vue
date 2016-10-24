process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';

var wallabyWebpack = require('wallaby-webpack');
var webpackConfig = {
    externals: {
        'react': 'React',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    resolve: {
        extensions: ['', '.js', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.json/, loader: 'json'
            }
        ]
    }
};

module.exports = function(wallaby) {
    return {
        files: [
            {pattern: 'specSetup.js'},
            {pattern: 'specHelpers/*.js'},
            {pattern: 'src/**'},
            {pattern: '!src/**/Stories.js'},
            {pattern: '!src/**/*.spec.js'}
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
