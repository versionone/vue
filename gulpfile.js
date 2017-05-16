const path = require('path');
const fs = require('fs');

const normalizedPath = path.join(__dirname, 'scripts');

fs
    .readdirSync(normalizedPath)
    .filter(isJavaScriptFile)
    .forEach((file) => require(path.join(normalizedPath, file)));

function isJavaScriptFile(file) {
    return file.endsWith('.js');
}
