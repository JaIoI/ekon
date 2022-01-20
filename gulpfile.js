const gulp         = require('gulp');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS     = require('gulp-clean-css');
const uglify       = require('gulp-uglify');
const del          = require('del');
const browserSync  = require('browser-sync').create();
const sourcemaps   = require('gulp-sourcemaps');
const stylus       = require('gulp-stylus');
const rename       = require('gulp-rename');
const pug          = require('gulp-pug');
const jsImport     = require('gulp-js-import');

const styleFiles = [
	'./src/styles/main.styl'
];
const scriptFiles = [
	'./src/js/main.js'
];

gulp.task('styles', () => {
	return gulp.src(styleFiles)
	.pipe(sourcemaps.init())
	.pipe(stylus())
	.pipe(concat('main.css'))
	.pipe(autoprefixer({
		browsers: ['last 10 versions'],
		cascade: false
	}))
	.pipe(cleanCSS({
		level: 2,
	}))
	.pipe(sourcemaps.write())
	.pipe(rename({
		suffix: '.min'
	}))
	.pipe(gulp.dest('./build/css'))
	.pipe(browserSync.stream());
});

gulp.task('scripts', () => {
	return gulp.src(scriptFiles)
	.pipe(gulp.dest('./build/js'))
	.pipe(browserSync.stream());
});

gulp.task('del', () => {
	return del(['build/*'])
});

gulp.task('pug', () => {
	// return gulp.src('./src/usability.pug')
	return gulp.src('./src/*.pug')
	.pipe(pug({
		pretty: true
	}))
	.pipe(gulp.dest('./build/'))
});

gulp.task('removeFonts', () => {
	return gulp.src('./src/fonts/**')
	.pipe(gulp.dest('./build/fonts/'))
});

gulp.task('removeImg', () => {
	return gulp.src('./src/img/**')
	.pipe(gulp.dest('./build/img/'))
});

gulp.task('removeJs', () => {
	return gulp.src('./src/js/app.js')
	.pipe(jsImport({hideConsole: true}))
	.pipe(uglify({
		toplevel: true
	}))
	.pipe(gulp.dest('./build/js/'))
});

gulp.task('removeCssLibs', () => {
	return gulp.src('./src/styles/libs/**')
	.pipe(gulp.dest('./build/css/libs/'))
});

gulp.task('removeJsLibs', () => {
	return gulp.src('./src/js/libs/**')
	.pipe(gulp.dest('./build/js/libs/'))
});

gulp.task('watch', () => {
	browserSync.init({
		server: {
			baseDir: './build/',
			// index: "usability.html",
		}
	});
	gulp.watch('./src/styles/**/*.styl', gulp.series('styles'));
	gulp.watch('./src/js/main.js', gulp.series('scripts'));
	gulp.watch(['./src/**/*.pug', './src/pug/svg/*.svg']).on('change', gulp.series('pug', browserSync.reload));
});

gulp.task('default', gulp.series('del', gulp.parallel('styles', 'removeCssLibs', 'scripts', 'removeJsLibs', 'pug', 'removeFonts', 'removeImg', 'removeJs'), 'watch'));