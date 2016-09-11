'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');

// concat all styles
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/sass/**/*.scss', ['sass']);
});

// concat all javascript
gulp.task('js', function(){
	return gulp.src([
		'src/vendor/jquery/dist/jquery.min.js',
		'src/vendor/slick-carousel/slick/slick.min.js',
		'src/js/main.js'
	])
	// .pipe(sourcemaps.init())
	.pipe(concat('main.js'))
	// .pipe(sourcemaps.write())
	.pipe(uglify())
	.pipe(gulp.dest('./dist/js'));
});

// move vendor fonts
gulp.task('fonts', function() {
	return gulp.src([
		'src/vendor/slick-carousel/slick/fonts/slick.*'
	])
	.pipe(gulp.dest('./dist/css/fonts'));
});

// Default task
gulp.task('default', ['sass', 'js'], function () {
    gulp.start('build');
});