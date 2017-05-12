const del = require('del');
const gulp = require('gulp');

gulp.task('clean', () => del([
    '*',
    '!.storybook',
    '!docs',
    '!node_modules',
    '!packages',
    '!scripts',
    '!specHelpers',
    '!src',
    '!gulp',
    '!*.*',
    'index.js',
]));
