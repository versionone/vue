var fs = require('fs');
var path = require('path');
var dirs = require('./directories');

var fsItems = fs.readdirSync(dirs.src);
var storyPathRequires = fsItems
    .filter(dirs.isDirectory(dirs.src))
    .filter(hasStories(dirs.src))
    .map(toStoryPaths(dirs.src));

var configContents = `import {configure} from '@kadira/storybook';
function loadStories() {
    ${storyPathRequires.join(`
    `)}
}
configure(loadStories, module);`;

fs.writeFile(path.join(dirs.app, '.storybook', 'config.js'), configContents, function(error) {
    if (error) {
        return console.error(error);
    }
    console.log('Storybook config written');
});

function hasStories(srcDirectory) {
    return function(directoryRef) {
        return fs.existsSync(path.join(srcDirectory, directoryRef, 'Stories.js'));
    };
}

function toStoryPaths(srcDirectory) {
    return function(directoryRef) {
        return `require('${path.join(srcDirectory, directoryRef, 'Stories.js')}');`;
    };
}