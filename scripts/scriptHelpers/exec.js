require('babel-polyfill');
const exec = require('child_process').exec;

module.exports = command => new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
        if (error) {
            reject(error);
            return;
        }
        if (stderr) {
            reject(stderr);
            return;
        }
        resolve(stdout);
    });
});
