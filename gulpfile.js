var gulp = require('gulp');
var cleanCSS = require('gulp-clean-css'); 
var uglify = require('gulp-uglify'); 
var rename = require("gulp-rename");
var dest = require('gulp-dest');


gulp.task('default', ['comprimir-css', 'comprimir-js']);


gulp.task('comprimir-css', () => {
  return gulp.src('src/css/styles.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(rename('styles.min.css'))
    .pipe(gulp.dest('css/'));
});

gulp.task('comprimir-js', () => {
  return gulp.src('js/app.js')
    .pipe(uglify())
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('js/'));
});