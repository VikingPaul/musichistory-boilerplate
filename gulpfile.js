var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var jshint = require('gulp-jshint');

gulp.task('default', ['lint', 'sassify', 'watch']);

gulp.task('watch', function() {
  gulp.watch('./sass/**/*.scss', ['sassify']);
  gulp.watch('./javascripts/**/*.js', ['lint']);
});

gulp.task('sassify', function () {
  return gulp.src('./sass/**/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});

gulp.task('lint', function() {
  return gulp.src('./javascripts/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});