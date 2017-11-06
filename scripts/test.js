const gulp = require('gulp');
const jest = require('gulp-jest').default;
const pkg = require('../package.json');

gulp.task('test', [
    'test/src',
    'test/icons',
], () => {
});

gulp.task('test/src', [
    'build/icons',
], () => {
    process.env.NODE_ENV = 'test';
    return gulp.src([
        'src',
        '!packages',
    ])
        .pipe(jest(pkg.jest));
});

gulp.task('test/icons', [
    'install/icons',
], () => {
    process.env.NODE_ENV = 'test';
    return gulp.src('packages')
        .pipe(jest(pkg.jest));
});
