var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');

var source = require('vinyl-source-stream');

gulp.task('watchify', function() {
  var bundler = browserify({
    // begin config settings required by watchify
    cache: {},
    packageCache: {},
    fullPaths: true
    // end config settings required by watchify
  });

  bundler = watchify(bundler);
  bundler.on('update', rebundle);

  // entry point into our commonjs modules
  bundler.add('./app/index.js');

  function rebundle() {
    return bundler.bundle()
      // converts node stream to gulp-friendly stream
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./app/build'))
  }

  return rebundle();
});
