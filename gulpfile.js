var gulp = require('gulp');
var browserify = require('gulp-browserify');
var inject = require('gulp-inject');
var rename = require('gulp-rename');

gulp.task('client', function () {
    return gulp.src('client/game.js')
        .pipe(browserify({
            debug: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('index', ['client'], function () {
    return gulp.src('client/index.html')
        .pipe(inject(gulp.src([
            'build/**/*.js',
            'build/**/*.css'
        ], {read: false}), {
            ignorePath: '../build',
            relative: true
        }))
        .pipe(gulp.dest('build'));
});

gulp.task('run', ['index', 'client'], function () {
    require('./server/index.js');
});