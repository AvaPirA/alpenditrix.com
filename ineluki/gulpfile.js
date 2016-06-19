'use strict';

var gulp = require('gulp');
var wrench = require('wrench');

/*
  concatenate all *.js files in the 'gulp' folder
 */
wrench.readdirSyncRecursive('./gulp').filter(function(file) {
  return (/\.(js)$/i).test(file);
}).map(function(file) {
  require('./gulp/' + file);
});

/*
  executed as default task, when no task is specified
 */
gulp.task('default', ['inject'], function() {
});