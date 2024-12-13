// gulpfile.js

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
        .pipe(browserSync.stream())
}

// Minify JavaScript
function buildJs() {
    return src('src/js/main.js')
        .pipe(terser())
        .pipe(dest(paths.jsDest))
        .pipe(browserSync.stream())
}

// BrowserSync serve
function serve() {
    browserSync.init({
        server: {
            baseDir: './', // Serve from the root of the project
        },
        port: 3000,
    })
}

// Watch files for changes
function watchFiles() {
    watch(paths.scss, buildSass)
    watch(paths.js, buildJs)
    watch('./*.html').on('change', browserSync.reload)
}

// Define complex tasks
const build = series(parallel(buildSass, buildJs))
const watchTask = series(build, parallel(serve, watchFiles))

// Export tasks
exports.build = build
exports.watch = watchTask
exports.dev = watchTask
exports.default = build
