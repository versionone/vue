const babel = require('gulp-babel');
const gulp = require('gulp');
const exec = require('./scriptHelpers/cliUtils').exec;

gulp.task('build', [
    'build/icons',
    'clean',
], () => {
    process.env.NODE_ENV = 'production';
    gulp.src([
        'src',
        'src/**/*.js',
        '!**/Stories.js',
        '!**/__tests__/*.test.js',
        '!**/_meta.js',
        '!**/examples/*.*',
    ])
        .pipe(babel({
            env: 'production',
        }))
        .pipe(gulp.dest(process.cwd));
});

gulp.task('build/icons', [
    'install/icons',
], () => {
    process.env.NODE_ENV = 'production';
    return exec('node packages/v1-icon-builder/src/build.js --svgDir=./packages/v1-icons/src --outputDir=./src/Icons')
});
