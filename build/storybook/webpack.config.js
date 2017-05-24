const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

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
};
