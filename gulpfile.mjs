import { createRequire } from "module";
const require = createRequire(import.meta.url);

const { src, dest, watch, series, parallel } = require("gulp");
import sassModule from "gulp-sass";
import * as sassCompiler from "sass";
import autoprefixer from "gulp-autoprefixer";
import csso from "gulp-csso";
import sourcemaps from "gulp-sourcemaps";
import rename from "gulp-rename";
import gutil from "gulp-util";
import browserSyncModule from "browser-sync";
import uglify from 'gulp-uglify-es';

const sass = sassModule(sassCompiler);
const browserSync = browserSyncModule.create();

async function images() {
  const imagemin = await import("gulp-imagemin");
  return src("src/assets/img/**/*")
    .pipe(imagemin.default())
    .pipe(dest("dist/assets/img"));
}

function js() {
  return src('src/js/**/*.js')
    .pipe(uglify.default())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dist/assets/js/'));
}

function copyHTML() {
  return src("./*.html")
    .pipe(dest("./dist/")) // Adjusted the output path
    .pipe(browserSync.stream());
}

function styles() {
  return src("src/sass/**/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(autoprefixer())
    .pipe(csso())
    .on("error", (err) => {
      gutil.log(gutil.colors.red("[Error]"), err.toString());
    })
    .pipe(rename({ suffix: ".min" }))
    .pipe(sourcemaps.write("."))
    .pipe(dest("dist/assets/css"))
    .pipe(browserSync.stream()); // <= Added this line
}


function watchFiles() {
  browserSync.init({
    server: {
      baseDir: "./dist",
    },
    online: true, // Added this line
    open: false,
  });

  watch("src/sass/**/*.scss", styles);
  watch("./*.html", series(copyHTML));
  watch("src/assets/img/**/*", images);
  watch("src/js/**/*.js", js);
}

const defaultTask = series(parallel(styles, images, copyHTML, js));

export { styles, images, watchFiles as watch, defaultTask as default };