const path = require('path');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.css?$/,
                loaders: [
                    'style',
                    'css',
                    'postcss',
                    'less',
                ],
                include: path.resolve(__dirname, '../')
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    resolve: {
        alias: {
            '@versionone/ui': path.resolve(__dirname, '../src'),
        }
    },
    postcss: function() {
        return [
            precss,
            autoprefixer,
        ];
    }
};
