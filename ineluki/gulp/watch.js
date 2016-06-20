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
      gulp.start('css')
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.src, '**/*.js'), function(event) {
    if (isOnlyChange(event)) {
      gulp.start('js');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(path.join(conf.src, '**/*.html'), function(event) {
    if (isOnlyChange(event)) {
      gulp.start('templates');
    } else {
      gulp.start('inject');
    }
  });
});