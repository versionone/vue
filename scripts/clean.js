var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');
var dirs = require('./directories');

var fsItems = fs.readdirSync(dirs.src);
fsItems = fsItems
    .map(toDeployedDirectory(dirs.app))
    .filter(hasMatchingDeployedDirectory())
    .forEach(deleteDeployedDirectory());

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

function deleteDeployedDirectory() {
    return function(directoryRef) {
        rimraf(path.join(directoryRef), logDone(directoryRef));
    }
}

function logDone(directoryRef) {
    return function() {
        console.log('cleaned', directoryRef);
    }
}