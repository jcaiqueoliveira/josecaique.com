const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
var deploy      = require('gulp-gh-pages');

// Compilando o Sass, adicionando autoprefixed e dando refresh na página
function compilaSass() {
    return gulp.src('scss/*.scss')
    .pipe(sass({outputStyle : 'compressed'}))
    .pipe(autoprefixer({
        overrideBrowserslist: ['last 2 versions'],
        cascade: false,
    }))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

// Tarefa do Sass
gulp.task('sass', compilaSass);

// Funções de aplicação dos plugins externos - CSS
function pluginsCss() {
    return gulp.src('css/lib/*.css')
    .pipe(concat('plugins.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

// Tarefas dos Plugins CSS
gulp.task('pluginscss', pluginsCss);

// Copilando o JS
function gulpJs() {
    return gulp.src('js/scripts/*.js')
    .pipe(concat('all.js'))
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

// Tarefa do JS
gulp.task('alljs', gulpJs);

// Funções de aplicação dos plugins externos - JS
function pluginsJs() {
    return gulp.src(['./js/lib/aos.min.js', './js/lib/swiper.min.js'])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}

// Tarefas dos Plugins JS
gulp.task('pluginsjs', pluginsJs);

// Função do Browser Sync
function browser() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    })
}

// Tarefa do Browser Sync
gulp.task('browser-sync', browser);

// Função do Watch para alterações em Sass, HTML e JS
function watch() {
    gulp.watch('scss/*.scss', compilaSass);
    gulp.watch('css/lib/*.css', pluginsCss);
    gulp.watch('*.html').on('change', browserSync.reload);
    gulp.watch('js/scripts/*.js', gulpJs);
    gulp.watch('js/lib/*.js', pluginsJs);
}

// Tarefa do Watch
gulp.task('watch', watch);

// Tarefa Default que executa o Watch e o Browser Sync
gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'pluginscss', 'alljs', 'pluginsjs'));

/**
 * Push build to gh-pages
 */
gulp.task('deploy', function () {
    return gulp.src("./dist/**/*")
    .pipe(deploy())
});