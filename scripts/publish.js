const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const sequence = require('run-sequence');
const yargs = require('yargs');
const exec = require('./scriptHelpers/exec');

const getVersionToPublish = () => {
    const params = yargs
        .option('type', {
            alias: 't',
            demandOption: true,
            describe: 'version type; one of [patch, minor, major, next]',
        })
        .fail((msg, error, y) => {
            if (error) {
                throw new gutil.PluginError({
                    message: error,
                    plugin: 'publish',
                });
            }
            console.error(msg);
            console.error('You should be doing', y.help());
            process.exit(1);
        })
        .exitProcess(false)
        .argv;

    return params.type;
};

const isInvalidVersion = version => [
    'patch',
    'minor',
    'major',
    'next',
].indexOf(version) === -1;

const version = versionToPublish => new Promise((resolve, reject) => {
    if (isInvalidVersion(versionToPublish)) {
        reject(`Invalid version provided: ${versionToPublish}`);
        return null;
    }
    if (versionToPublish === 'next') {
        const currentVersion = require('./../package.json').version;
        console.log(`Publishing as an update to ${currentVersion}-next.`);
        console.log('This will not publish the docs site.');
        return exec(`npm version ${currentVersion} --tag next`);
    }
    console.log(`Publishing as a new ${versionToPublish} version.`);
    return exec(`npm version ${versionToPublish}`);
});

const publish = () => exec('npm publish');

const shouldNotPublishDocs = versionToPublish => [
    'minor',
    'major',
].indexOf(versionToPublish) === -1;

const publishDocs = versionToPublish => new Promise((resolve) => {
    if (shouldNotPublishDocs(versionToPublish)) {
        resolve();
        return null;
    }

    process.chdir(path.join(process.cwd, 'docs'));
    return exec('npm run gh-pages:build'); // -p
});

gulp.task('publish', [
    'clean',
], (cb) => {
    const versionToPublish = getVersionToPublish();
    if (isInvalidVersion(versionToPublish)) {
        throw new gutil.PluginError({
            message: `Invalid version type ${versionToPublish}. Must be one of [patch, minor, major, next]`,
            plugin: 'publish/src',
        });
    }
    sequence('publish/src', (error) => {
        sequence('clean', () => cb(error));
    });
});

gulp.task('publish/src', [
    'lint',
    'test',
    'build',
], () => {
    const versionToPublish = getVersionToPublish();

    return version(versionToPublish)
        // .then(publish())
        .then(publishDocs(versionToPublish))
        .catch((error) => {
            throw new gutil.PluginError({
                message: error,
                plugin: 'publish/src',
            });
        });
});
