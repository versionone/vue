require('babel-polyfill');
const cp = require('child_process');
const gutil = require('gulp-util');

const exec = cp.exec;
const execSync = cp.execSync;

module.exports.execSync = (command) => {
    console.log(command);
    return execSync(command, {
        encoding: 'utf-8',
    });
};

module.exports.exec = command => new Promise((resolve, reject) => {
    console.log(`Executing command: ${command}`);
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

module.exports.exit = (message, plugin) => {
    process.exit(1);
    throw new gutil.PluginError({
        message,
        plugin,
    });
};
