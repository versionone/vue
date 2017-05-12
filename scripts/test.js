const gulp = require('gulp');
const jest = require('gulp-jest').default;

gulp.task('test', [
    'test/src',
    'test/packages',
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

gulp.task('test/packages', () => {
    process.env.NODE_ENV = 'test';
    return gulp.src('packages')
        .pipe(jest());
});
