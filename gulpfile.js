const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const del = require('del');

// Limpa a pasta dist
gulp.task('clean', () => {
    return del(['dist']);
});

// Compila SCSS e minifica CSS
gulp.task('styles', () => {
    return gulp.src('src/scss/style.scss')  // CAMINHO ATUALIZADO
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS())
        .pipe(gulp.dest('dist/css'));
});

// Copia imagens (se houver)
gulp.task('images', () => {
    return gulp.src('assets/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets'));
});

// Copia HTML
gulp.task('html', () => {
    return gulp.src('src/**/*.html')
        .pipe(gulp.dest('dist'));
});

// Tarefa principal
gulp.task('build', gulp.series('clean', gulp.parallel('styles', 'images', 'html')));

// Tarefa de observação automática
gulp.task('watch', () => {
    gulp.watch('src/scss/**/*.scss', gulp.series('styles'));
    gulp.watch('src/**/*.html', gulp.series('html'));
    gulp.watch('assets/**/*', gulp.series('images'));
});