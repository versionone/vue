const gulp = require('gulp');
const jest = require('gulp-jest').default;

gulp.task('test', [
    'test/src',
    'test/icons',
], () => {
});

gulp.task('test/src', () => {
    process.env.NODE_ENV = 'test';
    return gulp.src([
        'src',
        '!packages',
    ])
        .pipe(jest());
});

gulp.task('test/icons', [
    'install/icons',
], () => {
    process.env.NODE_ENV = 'test';
    return gulp.src('packages')
        .pipe(jest());
});
