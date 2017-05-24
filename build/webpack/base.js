const camelCase = require('camelcase');
const glob = require('glob');
const path = require('path');
const webpack = require('webpack');

const pkg = require(path.join(process.cwd(), 'package.json'));
const defaultPackageMains = () => {
    const options = new webpack.WebpackOptionsDefaulter();
    options.process({});
    return options.defaults.resolve.packageMains;
};

const webpackConfig = {
    entry: {
        [pkg['ui/webpack/output']]: [
            `./${pkg['ui/webpack/entry']}`,
        ],
    },
    output: {
        path: './',
        filename: '[name]',
        libraryTarget: 'commonjs2',
    },
    resolve: {
        extensions: [
            '',
            '.js',
        ],
        packageMains: [
            'ui/webpack/entry',
            ...defaultPackageMains(),
        ],
    },
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
            {
                test: /\.png$/,
                loader: 'url-loader',
            },
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [],
};

module.exports = webpackConfig;
