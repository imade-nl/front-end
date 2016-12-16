'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var tinypng = require('gulp-tinypng');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// compile all sass
gulp.task('sass', function () {
  return gulp.src('./src/sass/**/*.scss')
	.pipe(sass().on('error', sass.logError))
	// .pipe(sourcemaps.init())
	.pipe(autoprefixer({ browsers: ['last 5 versions', 'IE 9', 'IE 10'], cascade: false }))
	.pipe(cleanCSS())
	.pipe(concat('all.min.css'))
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
		'src/vendor/clickblock/jquery.clickblock.js',
		// 'src/vendor/slick-carousel/slick/slick.min.js',
		// 'src/vendor/owl.carousel/dist/owl.carousel.min.js',
		// 'src/vendor/matchheight/dist/jquery.matchHeight.js',
		'src/vendor/highlight/jquery.highlight.js',
		'src/js/main.js'
	])
	// .pipe(sourcemaps.init())
	.pipe(concat('all.min.js'))
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
  var img_tiny = gulp.src('src/img/**/*.{png,jpg,jpeg}')
      // .pipe(tinypng('API_KEY'))
      .pipe(gulp.dest('./dist/img'));
	
  var img_other = gulp.src('src/img/**/*.{gif,svg}')
      .pipe(gulp.dest('./dist/img'));

  return merge(img_tiny, img_other);
});

// watch for changed html src files
gulp.task('img:watch', function () {
  gulp.watch('./src/img/**/*.{png,jpg,jpeg,gif,svg}', ['img']);
});

// copy vendor fonts
gulp.task('fonts', function() {
	return gulp.src([
		// 'src/vendor/slick-carousel/slick/fonts/*.{eot,svg,ttf,woff}'
		'src/vendor/fontastic/fonts/*.{eot,svg,ttf,woff}'
	])
	.pipe(gulp.dest('./dist/css/fonts'));
});

// watch all
gulp.task('watch', ['sass:watch', 'js:watch', 'img:watch', 'html:watch'], function () {
  console.log('Watch is geactiveerd (sass, js, img, html).');
});

// Default task
gulp.task('default', ['sass', 'js', 'img', 'html', 'fonts'], function () {
  console.log('Run default tasks (sass, js, img, html, fonts).');
});
