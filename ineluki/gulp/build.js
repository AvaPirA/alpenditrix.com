var gulp = require('gulp');
var path = require('path');
var inject = require('gulp-inject');
var es = require('event-stream');
var wiredep = require('wiredep').stream;
var rev = require('gulp-rev');
var uglify = require('gulp-uglify');
var less = require('gulp-less');
var minifyCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
var angularFilesort = require('gulp-angular-filesort')
var templates = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-htmlmin');
var mainBowerFiles = require('main-bower-files');
var conf = require('./conf');

function minifyHtmlCooked() {
  return minifyHtml({
      collapseBooleanAttributes: false,
      collapseWhitespace: true,
      removeAttributeQuotes: false,
      removeComments: true,
      removeEmptyAttributes: false,
      removeRedundantAttributes: false,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      minifyJS: true,
      minifyCSS: true
    });
}

gulp.task('css', function() {
  return gulp.src([
      '!vendor/**',
      'app/**/*.less'
    ])
  .pipe(less())
  .pipe(concat('styles.css'))
  .pipe(minifyCSS())
//  .pipe(rev())
  .pipe(gulp.dest(conf.dist));
})

gulp.task('templates', function () {
  return gulp.src([
      'app/**/*.html',
      '!app/index.html',
      '!app/vendor/**'
    ])
    .pipe(minifyHtmlCooked())
    .pipe(templates('templates.js', {
        standalone: true,
        moduleSystem: 'IIFE'
      }))
//    .pipe(rev())
    .pipe(gulp.dest(conf.dist));
});

gulp.task('js', ['templates'], function() {
  return gulp.src(wildcardFull(conf.src, 'js'))
      .pipe(angularFilesort())
      .pipe(concat('scripts.js'))
      .pipe(uglify())
//      .pipe(rev())
      .pipe(gulp.dest(conf.dist));
});

gulp.task('inject', ['copy-deps', 'js', 'css'], function() {
  var CSS = gulp.src(wildcard(conf.dist, 'css'), { read: false });
  var JS = gulp.src(wildcard(conf.dist, 'js')).pipe(angularFilesort());
  var BOWER = gulp.src(wildcard(path.join(conf.dist, conf.vendor)), {read: false});
  var injectOptions = {
      addRootSlash: false,
      ignorePath: conf.dist
    };

  gulp.src('app/*.html')
      .pipe(inject(JS, injectOptions))
      .pipe(inject(CSS, injectOptions))
      .pipe(wiredep(BOWER))
      .pipe(minifyHtmlCooked())
      .pipe(gulp.dest(conf.dist));
});

gulp.task('copy-deps', function() {
  return gulp.src(mainBowerFiles(), { base: 'vendor' })
    .pipe(gulp.dest(path.join(conf.dist, 'vendor')));
});

gulp.task('clean', function () {
    return require('del')(ultimateWC(conf.dist)).then(function (paths) {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

function ultimateWC(uri) {
  return wildcard(wildcardFull(uri));
}

function wildcard(uri, ext) {
  if (ext) {
    return path.join(uri, '*.' + ext);
  } else {
    return path.join(uri, '*');
  }
}

function wildcardFull(uri, ext) {
    if (ext) {
        return path.join(path.join(uri, '**'), '*.' + ext);
    } else {
        return path.join(uri, '**');
    }
}