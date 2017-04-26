#!/usr/bin/env node

const execSync = require('child_process').execSync;
const args = require('yargs').argv;

const version = args._[0];

if (!version) {
    console.log('Version not specified (patch | minor | major | prepatch | preminor | premajor | prerelease | 1.2.3)');
    console.log('Example: npm run pub patch');
    process.exitCode = 1;
    return;
}

execSync(`./node_modules/.bin/np ${version}`);

if (shouldPublishDocs(version)) {
    execSync('npm run publish:docs');
}

function shouldPublishDocs(publishedVersion) {
    const docPublishableVersions = [
        'minor',
        'major',
    ];
    return docPublishableVersions.indexOf(publishedVersion) > -1;
}
