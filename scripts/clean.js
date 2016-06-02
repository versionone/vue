var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var dirs = require('./directories');

var fsItems = fs.readdirSync(dirs.src);
fsItems = fsItems
    .filter(dirs.isDirectory(dirs.src))
    .map(toDeployedDirectory(dirs.app))
    .filter(hasMatchingDeployedDirectory())
    .forEach(deleteDeployedDirectory(dirs.app));

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