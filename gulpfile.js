// Include Gulp
var gulp = require('gulp');

// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

// Define default destination folder
var dest = 'assets/vendor/';

gulp.task('js', function() {

	var jsFiles = ['src/js/*'];

	return gulp.src(plugins.mainBowerFiles().concat(jsFiles))
		.pipe(plugins.filter('**/*.js'))
		.pipe(plugins.concat('main.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest(dest + 'js'));

});

gulp.task('css', function() {

	var cssFiles = ['src/css/*'];

	return gulp.src(plugins.mainBowerFiles().concat(cssFiles))
		.pipe(plugins.filter('**/*.css'))
		.pipe(plugins.concat('main.css'))
		.pipe(plugins.minifyCss())
		.pipe(gulp.dest(dest + 'css'));

});

gulp.task('build', ['js','css']);
gulp.task('default', ['js','css']);