var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var vueify = require('vueify');
var sass = require('gulp-sass');

gulp.task('watch', function() {
  // JS build
  gulp.watch([
    './frontend/js/**/*.js',
    './frontend/js/**/*.vue'
  ], [ 'build' ]);

  // Sass compile
  gulp.watch([
    './frontend/scss/*.scss'
  ], [ 'sass' ]);
});

gulp.task('build', function() {
  browserify({
    entries: [ './frontend/js/main.js' ]
  })
  .transform('vueify')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./backend/public/javascripts'));
});

gulp.task('sass', function() {
  gulp.src('./frontend/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./backend/public/stylesheets'));
});
