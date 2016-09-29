'use strict';

var path = require('path');
var gulp = require('gulp');
var conf = require('./conf');

var browserSync = require('browser-sync');

function isOnlyChange(event) {
  return event.type === 'changed';
}

gulp.task('watch', ['inject'], function() {

  gulp.watch([path.join(conf.src, '/*.html'), 'bower.json'], ['inject']);

  gulp.watch(path.join(conf.src, '**/*.less'), function(event) {
    if (isOnlyChange(event)) {
      startAndReload('css');
    } else {
      startAndReload('inject');
    }
  });

  gulp.watch(path.join(conf.src, '**/*.js'), function(event) {
    if (isOnlyChange(event)) {
      startAndReload('js');
    } else {
      startAndReload('inject');
    }
  });

  gulp.watch(path.join(conf.src, '**/*.html'), function(event) {
    if (isOnlyChange(event)) {
      startAndReload('templates');
    } else {
      startAndReload('inject');
    }
  });

  function startAndReload(task) {
    var p = gulp.start(task, browserSync.reload);
  }
});