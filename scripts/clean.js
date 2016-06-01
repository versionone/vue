var fs = require('fs');
var path = require('path');
var rimraf = require('rimraf');

var fsItems = fs.readdirSync(path.join(__dirname, './../src'));
fsItems = fsItems.filter(isDirectory());

fsItems.forEach(deleteDist(path.join(__dirname, './../')));

function isDirectory() {
    return function(itemRef) {
        return fs.statSync(itemRef).isDirectory();
    }
}

function deleteDist(rootDirectory) {
    return function(directoryRef) {
        rimraf(path.join(rootDirectory, directoryRef), logDone);
    }
}

function logDone() {
    console.log('done');
}