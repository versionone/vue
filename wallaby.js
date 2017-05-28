const glob = require('glob');
const path = require('path');

const nodeModules = glob.sync('packages/*')
    .map((pkgDir) => path.join(__dirname, pkgDir, 'node_modules'));
process.env.NODE_PATH += `${path.delimiter}${nodeModules.join(path.delimiter)}`;

module.exports = (wallaby) => ({
    compilers: {
        '**/*.js': wallaby.compilers.babel(),
    },
    env: {
        runner: 'node',
        type: 'node',
    },
    files: [
        'testHelpers/**/*.js',
        'package.json',
        'packages/*/src/**/*.*',
        'packages/*/tests/**/*.*',
        '!packages/**/node_modules/**/*.*',
        '!packages/*/tests/**/*.test.js',
        '!packages/*/docs',
        '!packages/*/stories/**/*.*',
    ],
    filesWithNoCoverageCalculated: [
        'testHelpers/**/*.js',
        'packages/Icons/**/*.js',
        'packages/themes/**/*.js',
        'packages/**/.eslintrc.js',
        'testHelpers/.eslintrc.js',
    ],
    setup: (w) => {
        w.testFramework.configure(require('./package.json').jest);
    },
    testFramework: 'jest',
    tests: [
        'packages/*/tests/**/*.test.js',
    ],
});
