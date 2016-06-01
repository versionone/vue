var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var appRootDirectory = path.join(__dirname, '..');
var rootSrcDirectory = path.join(appRootDirectory, 'src');
var fsItems = fs.readdirSync(rootSrcDirectory);
fsItems = fsItems
    .filter(isDirectory(rootSrcDirectory))
    .map(toDeployedDirectory(appRootDirectory))
    .filter(hasMatchingDeployedDirectory())
    .forEach(deleteDeployedDirectory(appRootDirectory));

function isDirectory(rootDirectory) {
    return function(itemRef) {
        return fs.statSync(path.join(rootDirectory, itemRef)).isDirectory();
    }
}

function toDeployedDirectory(deployRootDirectory) {
    return function(directoryRef) {
        return path.join(deployRootDirectory, directoryRef);
    };
}

function hasMatchingDeployedDirectory() {
    return function(directoryRef) {
        return fs.existsSync(directoryRef);
    };
}

function deleteDeployedDirectory(rootDirectory) {
    return function(directoryRef) {
        rimraf(path.join(rootDirectory, directoryRef), logDone);
    }
}

function logDone() {
    console.log('done');
}