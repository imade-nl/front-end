'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-tinypng');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// compile all sass
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	// .pipe(sourcemaps.init())
	.pipe(autoprefixer({ browsers: ['last 3 versions', 'IE9', 'IE10'], cascade: false }))
	.pipe(cleanCSS())
	// .pipe(sourcemaps.write())
	.pipe(gulp.dest('./dist/css'));
});

// watch for changed sass files
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

// watch for a changed javascript main.js
gulp.task('js:watch', function () {
  gulp.watch('./src/js/main.js', ['js']);
});

// copy html files
gulp.task('html', function() {
	return gulp.src('src/*.html')
	.pipe(gulp.dest('./dist'));
});

// watch for changed html src files
gulp.task('html:watch', function () {
  gulp.watch('./src/*.html', ['html']);
});

// copy html files
gulp.task('img', function() {
	return gulp.src('src/img/**/*.*')
    .pipe(tingpng('gPdn6kO6r8IOXae9sG_IF2wcPVilEYzd'))
	.pipe(gulp.dest('./dist/img'));
});

// watch for changed html src files
gulp.task('img:watch', function () {
  gulp.watch('./src/img/**/*.*', ['img']);
});

// copy vendor fonts
gulp.task('fonts', function() {
	return gulp.src([
		'src/vendor/slick-carousel/slick/fonts/slick.*'
	])
	.pipe(gulp.dest('./dist/css/fonts'));
});

// watch all
gulp.task('watch', ['sass:watch', 'js:watch', 'html:watch'], function () {
  console.log('Watch is geactiveerd (sass, js, html).');
});

// Default task
gulp.task('default', ['sass', 'js', 'html', 'fonts'], function () {
  console.log('Default tasks zijn gestart (sass, js, html, fonts).');
});