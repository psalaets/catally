var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var source = require('vinyl-source-stream');
var del = require('del');
var browserSync = require('browser-sync');

gulp.task('watchify', ['clean'], function() {
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

gulp.task('watch', ['watchify'], function(cb) {
  browserSync({
    server: {
      baseDir: 'app/'
    },
    // do not mirror clicks/scroll/form interaction across browsers
    ghostMode: false
  }, function serverUp() {
    gulp.watch([
      // refresh when bundle changes
      'app/build/bundle.js',
      // refresh when html changes
      'app/index.html'
    ], {}, browserSync.reload);

    // tell gulp this task is done
    cb();
  });
});

gulp.task('clean', function(cb) {
  del(['app/build'], cb);
});

gulp.task('default', function() {
  console.log();
  console.log('Tasks:');
  console.log();
  console.log('  watch - Serve app locally with auto-reload');
  console.log('  clean - Delete generated files');
  console.log();
});