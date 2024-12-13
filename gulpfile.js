const { src, dest, series, parallel, watch } = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const terser = require('gulp-terser')
const browserSync = require('browser-sync').create()

// File paths
const paths = {
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js',
    cssDest: 'dist/css',
    jsDest: 'dist/js',
}

// Compile Sass
function buildSass() {
    return src('src/scss/main.scss')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(dest(paths.cssDest))
        .pipe(browserSync.stream()) // Inject updated CSS into browser without full reload
}

// Minify JavaScript
function buildJs() {
    return src('src/js/main.js')
        .pipe(terser())
        .pipe(dest(paths.jsDest))
        .pipe(browserSync.stream()) // After JS updates, reload the browser
}

// BrowserSync serve
function serve() {
    browserSync.init({
        server: {
            baseDir: './', // The base directory for your site, adjust if necessary
        },
    })
}

// Watch files for changes
function watchFiles() {
    watch(paths.scss, buildSass)
    watch(paths.js, buildJs)
    watch('./*.html').on('change', browserSync.reload) // Watch HTML changes and reload browser
}

exports.build = series(parallel(buildSass, buildJs))
exports.watch = series(exports.build, parallel(serve, watchFiles))
exports.default = exports.build
