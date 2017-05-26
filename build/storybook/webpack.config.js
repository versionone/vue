const glob = require('glob');
const path = require('path');
const precss = require('precss');
const autoprefixer = require('autoprefixer');

const hasEntryPoint = (pkg) => Boolean(pkg['ui/webpack/entry']);
const packages = glob.sync('packages/*/package.json')
    .map((pkgPath) => Object.assign({}, require(path.join(__dirname, '..', '..', pkgPath)), {
        dir: pkgPath
            .replace('packages/', '')
            .replace('/package.json', ''),
    }))
    .filter(hasEntryPoint);

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
        alias: packages.reduce((output, pkg) => Object.assign(output, {
            [pkg.name]: path.join(__dirname, '..', '..', 'packages', pkg.dir, pkg['ui/webpack/entry']),
        }), {}),
    },
};
