const fs = require('fs');
const gulp = require('gulp');
const gutil = require('gulp-util');
const path = require('path');
const sequence = require('run-sequence');
const yargs = require('yargs');
const cliUtils = require('./scriptHelpers/cliUtils');
const gitUtils = require('./scriptHelpers/gitUtils');

const exec = cliUtils.exec;
const execSync = cliUtils.execSync;
const exit = cliUtils.exit;
const docsDirectory = path.join(__dirname, '..', 'docs');

const getVersionTypeToPublish = () => {
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

const shouldPublishDocs = versionToPublish => [
    'minor',
    'major',
].indexOf(versionToPublish) === -1;

const addToMenu = (version) => {
    process.chdir(docsDirectory);
    const versionsFile = './www/versions.json';
    const versions = JSON.parse(fs.readFileSync(versionsFile, 'utf8'));
    versions.splice(0, 0, version);
    fs.writeFileSync(versionsFile, JSON.stringify(versions, null, 2));
    execSync(`git add ${versionsFile} && git commit -m "[Docs] Add ${version} to versions.json"`);
};

gulp.task('version', [], () => {
    const versionTypeToPublish = getVersionTypeToPublish();

    if (isInvalidVersion(versionTypeToPublish)) {
        exit(`Invalid version provided: ${versionTypeToPublish}`, 'version');
    }
    if (versionTypeToPublish === 'next') {
        const currentVersion = require('./../package.json').version;
        console.log(`Publishing as an update to ${currentVersion}-next.`);
        console.log('This will not publish the docs site.');
        return exec(`npm version ${currentVersion} --tag next`);
    }
    console.log(`Publishing as a new ${versionTypeToPublish} version.`);
    return exec(`npm version ${versionTypeToPublish}`);
});

gulp.task('publish', (done) => {
    const versionTypeToPublish = getVersionTypeToPublish();
    if (isInvalidVersion(versionTypeToPublish)) {
        exit(`Invalid version type ${versionTypeToPublish}. Must be one of [patch, minor, major, next]`, 'publish');
    }
    const tasks = [
        'version',
        'publish/src',
    ];

    if (shouldPublishDocs(versionTypeToPublish)) {
        console.log('Will publish docs site because the new version is a minor or major version.');
        tasks.push('publish/docs');
    }
    sequence(...tasks, (error) => {
        sequence('clean', () => done(error));
    });
});

gulp.task('publish/src', [
    'lint',
    'test',
    'build',
], () => exec('npm publish --access=public'));

gulp.task('publish/docs', () => {
    process.env.NODE_ENV = 'development';

    const pkg = require('./../package.json');
    const version = `v${pkg.version}`;
    console.log(`Publishing docs for ${version}`);

    // Ensure we are working in the docs directory
    process.chdir(docsDirectory);

    execSync('git checkout gh-pages && git pull origin gh-pages');
    if (gitUtils.lastCommitIsHead()) {
        execSync('git reset --hard HEAD~1');
    }
    execSync(`git checkout tags/${version}`);
    execSync('npm install');
    addToMenu(version);
    execSync('npm run browser:build');
    execSync('git checkout gh-pages');

    process.chdir(path.join(docsDirectory, '..'));
    // Symbolic link `release` to latest version
    execSync(`ln -sf ./${version} ./release`);
    // Symbolic link `versions.json` to latest version
    execSync(`ln -sf ./${version}/versions.json ./versions.json`);

    // Commit the new version
    if (version === 'HEAD') {
        execSync('git commit --amend --no-edit');
    }
    else {
        execSync(`git add . && git commit -m "${version}"`);
    }
    return execSync('git push -f');
});
