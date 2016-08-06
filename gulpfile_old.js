var gulp = require('gulp'); 
var path = require('path');
var concat = require('gulp-concat');
var filter = require('gulp-filter');
var watch = require('gulp-watch');
var rename = require('gulp-rename');
var minify_css = require('gulp-minify-css');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var main_bower_files = require('main-bower-files');

var paths = {
	vendor: path.resolve('assets/vendor'),
	theme: {
		css: path.resolve('./assets/css'),
		js: path.resolve('./assets/js'),
	},
	bootstrap: {
		css: path.resolve('./vendor/assets/bootstrap/css'),
	}
};
var vendor = {
	css: {
		filters: [
			'**/*.css',
			'!**/bootstrap.css'
		],
		manual: [
			'bootstrap-select/dist/css/bootstrap-select.css'
		]
	},
	js: {
		filters: [
			'**/*.js'
		],
		manual: [
			'bootstrap-select/dist/js/bootstrap-select.js'
		]
	}
};

gulp.task('css', function() {
  return gulp.src( paths.theme.css+'/main.css' )
    .pipe( css({ paths: [paths.bootstrap.css] }))
    .pipe( minify_css() )
    .pipe( rename('global.min.css') )
    .pipe( gulp.dest(paths.theme.css) );
});

gulp.task('js', function() {
  return gulp.src( [paths.theme.js+'/*.js','!**/*.min.js'] )
    .pipe( jshint() )
    .pipe( uglify() )
    .pipe( concat('global.min.js') )
    .pipe( gulp.dest(paths.theme.js) );
});

gulp.task('bower', function() {
  var js_filter = filter( vendor.js.filters );
  var css_filter = filter( vendor.css.filters );
  var prefix_paths = function(i){ return paths.vendor+'/'+i; };
  var files = main_bower_files().concat(
  	vendor.js.manual.map( prefix_paths ),
  	vendor.css.manual.map( prefix_paths )
  );
  return gulp.src( files, {base:paths.vendor} )
    .pipe( js_filter )
    .pipe( concat('vendor.js') )
    .pipe( gulp.dest(paths.vendor) )
    .pipe( js_filter.restore() )
    .pipe( css_filter )
    .pipe( concat('vendor.css') )
    .pipe( gulp.dest(paths.vendor) )
    .pipe( css_filter.restore() );
});

gulp.task('watch', function() {
    gulp.watch( paths.theme.js+'/*.js', ['js'] );
    gulp.watch( paths.theme.css+'/*.css', ['css'] );
});

gulp.task('build', ['js','css','bower']);
gulp.task('default', ['js','css','bower','watch']);
