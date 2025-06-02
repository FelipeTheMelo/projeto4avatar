const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const del = require('del');

// Limpa a pasta public
gulp.task('clean', () => {
    return del(['public']);
});

// Compila SCSS e minifica CSS
gulp.task('styles', () => {
    return gulp.src('src/scss/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('public/css'));
});

// Copia imagens
gulp.task('images', () => {
    return gulp.src('src/images/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('public/images'));
});

// Copia HTML
gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('public'));
});

// Copia favicon
gulp.task('favicon', () => {
    return gulp.src('src/favicon.ico', { allowEmpty: true }) // ADICIONE allowEmpty
        .pipe(gulp.dest('public'));
});

// Tarefa principal
gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'images', 'html', 'favicon')));

// Tarefa de observação
gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('src/**/*.html', gulp.series('html'));
    gulp.watch('src/images/**/*', gulp.series('images'));
    gulp.watch('src/favicon.ico', gulp.series('favicon'));
});