const alias = require('./../webpack/packageAliases');

module.exports = {
    module: {
        loaders: [
            {
                loader: 'json-loader',
                test: /\.json$/,
            },
        ],
    },
    resolve: {
        alias,
        plugins: [],
    },
}
;
