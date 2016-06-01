const path = require('path');
var precss = require('precss');
var autoprefixer = require('autoprefixer');

module.exports = {
    plugins: [],
    module: {
        loaders: [
            {
                test: /\.css?$/,
                loaders: ['style', 'css', 'postcss', 'less'],
                include: path.resolve(__dirname, '../')
            }
        ]
    },
    postcss: function () {
        return [precss, autoprefixer];
    }
};
