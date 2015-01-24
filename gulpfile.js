var gulp        = require('gulp');
var browserify  = require('browserify');
var watchify    = require('watchify');
var source      = require('vinyl-source-stream');
var del         = require('del');
var browserSync = require('browser-sync');

var uglify      = require('gulp-uglify');
var rev         = require('gulp-rev');
var inject      = require('gulp-inject');
var minifyCss   = require('gulp-minify-css');

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

gulp.task('watchify', ['clean'], function() {
  return makeBundle({dev: true});
});

gulp.task('clean', function(cb) {
  del(['app/build', 'build'], cb);
});

gulp.task('build', ['build-html']);

gulp.task('build-html', ['build-scripts', 'build-styles'], function() {
  var bundleJs = gulp.src('build/scripts/bundle-*.js', {read:false});
  var appCss = gulp.src('build/styles/app-*.css', {read:false});

  return gulp.src('app/index.html')
    .pipe(inject(bundleJs, {
      ignorePath: 'build/',
      addRootSlash: false
    }))
    .pipe(inject(appCss, {
      ignorePath: 'build/',
      addRootSlash: false
    }))
    .pipe(gulp.dest('build'));
});

gulp.task('build-scripts', ['browserify'], function() {
  return gulp.src('app/build/bundle.js')
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest('build/scripts'));
});

gulp.task('browserify', ['clean'], function() {
  return makeBundle();
});

gulp.task('build-styles', ['clean'], function() {
  return gulp.src('app/styles/app.css')
    .pipe(minifyCss())
    .pipe(rev())
    .pipe(gulp.dest('build/styles'));
});

gulp.task('default', function() {
  console.log();
  console.log('Tasks:');
  console.log();
  console.log('  watch - Serve app locally with auto-reload');
  console.log('  build - Generate deployable app in build/');
  console.log('  clean - Delete generated files');
  console.log();
});

//////////////////// Helper functions

// options.dev = true will...
//   - activate watchify
//   - generate inline source maps
function makeBundle(options) {
  options = options || {};
  options.dev = options.dev || false;

  var bundler = browserify({
    // begin config settings required by watchify
    cache: {},
    packageCache: {},
    fullPaths: true,
    // end config settings required by watchify
    debug: options.dev // inline source maps
  });

  if (options.dev) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  // entry point into our commonjs modules
  bundler.add('./app/index.js');

  function rebundle() {
    return bundler.bundle()
      // converts node stream to gulp-friendly stream
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./app/build'))
  }

  return rebundle();
}
