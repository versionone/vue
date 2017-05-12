#!/usr/bin/env node
//
// const execSync = require('child_process').execSync;
// const path = require('path');
//
// const version = process.argv[2];
//
// if (!version) {
//     console.log('Version not specified (patch | minor | major | prepatch | preminor | premajor | prerelease | 1.2.3)');
//     console.log('Example: npm run pub patch');
//     process.exitCode = 1;
//     return;
// }
//
// if (version === 'next') {
//     const currentVersion = require('./../package.json').version;
//     console.log(`Publishing as an update to ${currentVersion}-next.`);
//     console.log('This will not publish the docs site.');
//     execSync(`./node_modules/.bin/np ${currentVersion} --tag next`);
// } else {
//     console.log(`Publishing as a new ${version} version.`);
//     execSync(`./node_modules/.bin/np ${version}`);
// }
//
// if (shouldPublishDocs(version)) {
//     process.chdir(path.join(__dirname, '..', 'docs'));
//     execSync('npm run gh-pages:build -p');
// }
//
// function shouldPublishDocs(publishedVersion) {
//     const docPublishableVersions = [
//         'minor',
//         'major',
//     ];
//     return docPublishableVersions.indexOf(publishedVersion) > -1;
// }
