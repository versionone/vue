const glob = require('glob');
const path = require('path');

const hasEntryPoint = (pkg) => Boolean(pkg['ui/webpack/entry']);
const packages = glob.sync('packages/*/package.json')
    .map((pkgPath) => Object.assign({}, require(path.join(__dirname, '..', '..', pkgPath)), {
        dir: pkgPath
            .replace('packages/', '')
            .replace('/package.json', ''),
    }))
    .filter(hasEntryPoint);

module.exports = packages.reduce((output, pkg) => Object.assign(output, {
    [pkg.name]: path.join(__dirname, '..', '..', 'packages', pkg.dir, pkg['ui/webpack/entry']),
}), {});
