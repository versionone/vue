const gulp = require('gulp');
const path = require('path');
const exec = require('./scriptHelpers/cliUtils').exec;

const install = (workingDir = '') => {
    const cwd = process.cwd();
    return exec(`cd ${path.join(cwd, workingDir)} && npm install`)
        .catch((error) => {
            console.log(error);
        });
};

gulp.task('install/docs', () => install('docs'));

gulp.task('install/icons', () => install('packages/v1-icon-builder'));
