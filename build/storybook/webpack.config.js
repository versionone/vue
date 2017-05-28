const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
const alias = require('./../webpack/packageAliases');

module.exports = {
    module: {
        loaders: [
            {
                include: path.resolve(__dirname, '..', '..'),
                loaders: [
                    'style',
                    'css',
                    'postcss',
                    'less',
                ],
                test: /\.css?$/,
            },
            {
                loader: 'json',
                test: /\.json$/,
            },
        ],
    },
    plugins: [],
    postcss: () => [
        precss,
        autoprefixer,
    ],
    resolve: {
        alias,
    },
};
