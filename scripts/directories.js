#!/usr/bin/env node

var path = require('path');
var fs = require('fs');

var app = path.join(__dirname, '..');
module.exports.app = app;
module.exports.src = path.join(app, 'src');

module.exports.isDirectory = function isDirectory(rootDirectory) {
    return function isDirectorySpecification(itemRef) {
        return fs.statSync(path.join(rootDirectory, itemRef)).isDirectory();
    };
};
