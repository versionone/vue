var path = require('path');
var fs = require('fs');

var app = path.join(__dirname, '..');
module.exports.app = app;
module.exports.src = path.join(app, 'src');

module.exports.isDirectory = function(rootDirectory) {
    return function(itemRef) {
        return fs.statSync(path.join(rootDirectory, itemRef)).isDirectory();
    };
};
