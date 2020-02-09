var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-cssmin'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify-es').default,
    rename = require('gulp-rename'),
    clone = require('gulp-clone'),
    concat = require('gulp-concat'),
    include = require("gulp-include"),
	nunjucks = require('gulp-nunjucks-render'),
	prettier = require('gulp-prettier'),
	svgo = require('gulp-svgo'),
	imagemin = require('gulp-imagemin'),
	webp = require('gulp-webp'),
	del = require('del'),
    browserSync = require('browser-sync').create();

gulp.task('sass', function () {
    return gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('dist/static/css'))
		.pipe(browserSync.stream())
        .pipe(clone())
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/static/css'))
        .pipe(browserSync.stream());
});
gulp.task('js', function() {
    return gulp.src('src/js/scripts.js')
        .pipe(include())
        .on('error', console.log)
        .pipe(gulp.dest('dist/static/js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/static/js'));
});
gulp.task('njk', function() {
	return gulp.src('src/njk/pages/**/*.njk')
        .pipe(nunjucks({
            path: ['src/njk/layouts']
        }))
        .pipe(prettier({ proseWrap: 'never', printWidth: 800, tabWidth: 4, useTabs: true }))
        .pipe(gulp.dest('dist'));
});

gulp.task('fonts', function() {
	gulp.src('src/fonts/**/*-latin.*').pipe(gulp.dest('dist/static/fonts'));
	gulp.src('src/fonts/**/*-latin-extended.*').pipe(gulp.dest('dist/static/fonts'));
	gulp.src('src/fonts/**/*-cyrillic.*').pipe(gulp.dest('dist/static/fonts'));
	gulp.src('src/fonts/**/*-slogan.*').pipe(gulp.dest('dist/static/fonts'));
	return console.log('All needed fonts moved');
});
gulp.task('svg', () => {
    return gulp.src('src/img/**/*')
        .pipe(svgo())
        .pipe(gulp.dest('dist/static/img'));
});
gulp.task('img', () => {
	return gulp.src('src/img/**/*')
		.pipe(imagemin())

        .pipe(gulp.dest('dist/static/img'))
});

gulp.task('favicons', () => {
	return gulp.src('src/favicons/**/*')
		.pipe(imagemin([
		    imagemin.jpegtran({progressive: true}),
		    imagemin.optipng({optimizationLevel: 3}),
		    imagemin.svgo({
		        plugins: [
		            {cleanupIDs: true}
		        ]
		    })
		]))
        .pipe(gulp.dest('dist/static/img/favicons'));
});

gulp.task('del', () => {
	return del('dist');
});

gulp.task('build', gulp.series(
	'del',
	'scss',
	'njk',
	'js',
	'img',
	'svg',
	'favicons',
	'fonts'
));

gulp.task('default', function () {
	browserSync.init({
        server: "./dist"
    });
    gulp.watch('src/scss/**/*.scss', gulp.series('sass'));
	gulp.watch('src/njk/**/*.njk', gulp.series('njk')).on('change', browserSync.reload);
    gulp.watch('src/js/**/*.js', gulp.series('js')).on('change', browserSync.reload);
});
