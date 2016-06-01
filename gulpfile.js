const gulp = require('gulp');
const gutil = require('gulp-util');
const bower = require('bower');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const sh = require('shelljs');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const babel = require("gulp-babel");
const babelify = require('babelify');
const sourcemaps = require('gulp-sourcemaps');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const livereload = require('gulp-livereload');

const paths = {
   sass: ['./www/scss/**/*.scss'],
   js: ['./www/app/**/*.js']
};

gulp.task('default', ['watch']);

gulp.task('sass', function(done) {
   return gulp
      .src('./www/scss/ionic.app.scss')
      .pipe(sourcemaps.init())
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest('./www/css/'))
      .pipe(livereload());
});


gulp.task('browserify', function() {
   browserify('./www/app/config.js', { debug: true })
   .transform(babelify)
   .bundle()
   .on('error', gutil.log.bind(gutil, 'Browserify Error'))
   .pipe(source('main.js'))
   .pipe(buffer())
   .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
   .pipe(sourcemaps.write('./')) // writes .map file
   .pipe(gulp.dest('./www/js/'))
   .pipe(livereload());
});

gulp.task('watch', function() {
   gulp.watch(paths.sass, ['sass']);
   gulp.watch(paths.js, ['browserify']);
});
