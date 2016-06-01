process.env.NODE_ENV = 'test';
process.env.BABEL_ENV = 'test';
var pkg = require('./package.json');

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
            {pattern: 'node_modules/babel-polyfill/browser.js', instrument: false},
            {pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false},
            {pattern: 'node_modules/react/dist/react-with-addons.js', instrument: false},
            {pattern: 'node_modules/chai/chai.js', instrument: false},
            {pattern: 'src/**', load: false},
            {pattern: '!src/**/*.spec.js', load: false}
        ],
        tests: [
            {pattern: 'src/**/*.spec.js', load: false}
        ],
        compilers: {
            'src/**/*.js': wallaby.compilers.babel(pkg.babel)
        },
        postprocessor: wallabyWebpack(webpackConfig),
        testFramework: 'mocha',
        setup: function() {
            chai.should();
            window.__moduleBundler.loadTests();
        },
        debug: true
    };
};
