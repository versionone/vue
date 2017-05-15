const gulp = require('gulp');
const eslint = require('gulp-eslint');

gulp.task('lint', [
    'lint/src',
    'lint/test',
    // 'lint/packages',
], () => {
});

gulp.task('lint/src', () => gulp.src([
    'src/**/*.js',
    '!src/**/__tests__/*.js',
])
    .pipe(eslint(require('./../eslint.src')))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

gulp.task('lint/test', () => gulp.src([
    'src/**/__tests__/*.js',
])
    .pipe(eslint(require('./../eslint.specs')))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));

gulp.task('lint/packages', () => gulp.src([
    'packages/**/src/*.js',
    '!node_modules/**',
])
    .pipe(eslint(require('./../eslint.src')))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));
