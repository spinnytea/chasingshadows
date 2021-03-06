'use strict';
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var inject = require('gulp-inject');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync');
var karma = require('gulp-karma');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');

var config = require('./server/config');

var client_tests = [
  'build/game.js',
  'node_modules/angular-mocks/angular-mocks.js',
  'test/client/**/*.js'
];

var server_tests = [
  'test/server/**/*.js'
];

// A little workaround to pull this into other configs
if(exports) {
  exports.client_tests = client_tests;
  exports.server_tests = server_tests;
}

gulp.task('jshint', function () {
  return gulp.src([
    'client/**/*.js',
    'server/**/*.js'
  ]).pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(jshint.reporter('fail'));
});

gulp.task('js', ['jshint'], function () {
  return gulp.src('client/game.js')
  .pipe(browserify({
    debug: true
  }))
  .pipe(gulp.dest('build'))
  .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('index', ['js'], function () {
  return gulp.src('client/index.html')
  .pipe(inject(gulp.src([
    'build/**/*.js',
    'build/**/*.css'
    ], {read: false}), {
    ignorePath: '../build',
    relative: true
  }))
  .pipe(gulp.dest('build'))
  .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('reload', ['jshint'], function () {
  return gulp.src('')
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('watch', function () {
  // Re-run browserify and jshint if any client javascript is changed
  gulp.watch('client/**/*.js', ['js']);
  
  // Re-build the index page when its edited or the css is changed
  gulp.watch('client/**/*.css', ['index']);
  gulp.watch('client/index.html', ['index']);
  
  // Trigger reload when the server restarts
  gulp.watch('.server.stamp', function () {
    gulp.start(['reload']);
  });
});

var browser_running = false;
gulp.task('run', ['watch', 'index'], function () {
  nodemon({
    script: 'server/index.js',
    watch: ['server']
  }).on('start', function () {
    if(!browser_running) {
      browser_running = true;
      browserSync({
        proxy: 'localhost:' + config.port,
        online: false
        //browser: ["google-chrome"]
      });
    }
  });
});

gulp.task('test-client', ['js'], function () {
  return gulp.src(client_tests).pipe(karma({
    configFile: 'karma.conf.js',
    action: 'watch'
  }));
});

gulp.task('test-server', function () {
  return gulp.src(server_tests).pipe(mocha({
    reporter: 'nyan'
  }));
});

gulp.task('default', ['run']);