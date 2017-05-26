const execSync = require('child_process').execSync;
const pkg = require('./../../package.json');

// returns actualVersion >= desiredVersion
const versionIsGreaterOrEqual = (desiredVersion, actualVersion) => {
    const versionExpression = /v?\^?(\d+)\.(\d+)\.(\d+)/;
    const desiredVersionParts = versionExpression.exec(desiredVersion);
    const desiredMajor = Number(desiredVersionParts[1]);
    const desiredMinor = Number(desiredVersionParts[2]);
    const desiredPatch = Number(desiredVersionParts[3]);
    const actualVersions = versionExpression.exec(actualVersion);
    const actualMajor = Number(actualVersions[1]);
    const actualMinor = Number(actualVersions[2]);
    const actualPatch = Number(actualVersions[3]);
    if (actualMajor < desiredMajor) {
        return false;
    }
    else if (actualMajor > desiredMajor) {
        return true;
    }
    if (actualMinor < desiredMinor) {
        return false;
    }
    else if (actualMinor > desiredMinor) {
        return true;
    }
    if (actualPatch < desiredPatch) {
        return false;
    }
    else if (actualPatch > desiredPatch) {
        return true;
    }
    return true;
};

const createVersionCheck = (desiredVersions) => ({
                                                     node,
                                                     yarn,
                                                 }) => {
    const errors = {
        noYarn: {
            isProblem: false,
            message: 'You do not have yarn installed. This is a package manager client that installs from the regular npm registry, but ensures you get the same versions of all dependencies required for this repository. It is highly recommended that you install yarn: `npm install --global yarn` (learn more: https://yarnpkg.com/)',
        },
        oldNode: {
            getMessage: (desired, actual) => `Your version of node (${actual}) is older than the recommended version of ${desired}. Please install a more recent version. You can use http://git.io/nvm or https://github.com/coreybutler/nvm-windows to make upgrading your version of node easier.`,
            isProblem: false,
        },
        oldYarn: {
            getMessage: (desired, actual) => `Your version of yarn (${actual}) is older than the recommended version of ${desired}. 'Run \`yarn self-update\` (or \`npm install --global yarn@latest\`) to update.`,
            isProblem: false,
        },
    };

    errors.oldNode.isProblem = !versionIsGreaterOrEqual(desiredVersions.node, node);
    errors.oldNode.message = errors.oldNode.getMessage(desiredVersions.node, node);

    try {
        errors.oldYarn.isProblem = !versionIsGreaterOrEqual(desiredVersions.yarn, yarn);
        errors.oldYarn.message = errors.oldYarn.getMessage(desiredVersions.yarn, yarn);
    }
    catch (e) {
        errors.noYarn.isProblem = true;
    }
    const systemErrors = Object.keys(errors)
        .filter(key => errors[key].isProblem);
    const errorCount = systemErrors.length;
    if (errorCount !== 0) {
        const errorMessage = systemErrors
            .reduce((message, key) => `${message}\n${errors[key].message}`, '');
        const one = errorCount === 1;

        console.error(`There ${one ? 'is an issue' : 'are some issues'} with your system. It is quite likely that if you do not resolve these, you will have a hard time running this repository.
${errorMessage}`);
        console.info('If you don\'t care about these warnings, go ahead and install dependencies with `yarn`');
        console.info('Otherwise, please refer to the Prerequisites section of the README');
        return 1;
    }
    console.info('👍  You are good to go!');
    return 0;
};

const nodeVersion = process.version;
const yarnVersion = (execSync('yarn --version') || '')
    .toString()
    .trim();
const checkVersion = createVersionCheck(pkg.engines);
const exitCode = checkVersion({
    node: nodeVersion,
    yarn: yarnVersion,
});
process.exit = exitCode;
