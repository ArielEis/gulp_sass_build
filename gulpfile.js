const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-minify-css');
const htmlreplace = require('gulp-html-replace');


const path = {
    SASS: 'app/**/*.scss',
    HTML: 'index.html',
    MINIFIED_OUT: 'app/sass/style.min.css',
    DEST_SRC: 'build',
};


gulp.task('sass', function () {
    gulp.src(path.SASS)
        .pipe(sass())
        .pipe(minifyCSS())
        .pipe(concat(path.MINIFIED_OUT))
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('copyHTML', function () {
    gulp.src(path.HTML)
        .pipe(gulp.dest(path.DEST_SRC));
});

gulp.task('replaceHTML', function () {
    gulp.src(path.HTML)
        .pipe(htmlreplace({
            'css': '<link rel="stylesheet" href='+path.MINIFIED_OUT+'>'
        }))
        .pipe(gulp.dest(path.DEST_SRC));
});


gulp.task('build', ['sass', 'copyHTML', 'replaceHTML']);

gulp.task('default', ['build']);

