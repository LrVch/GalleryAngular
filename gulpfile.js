var gulp = require("gulp"),
    RS_CONF = require('./rs-conf.js'),
    // browserSync = require("browser-sync").create(),
    // notify = require('gulp-notify'),
// minifyCss = require('gulp-minify-css'),
//     cleanCSS = require('gulp-clean-css'),
//     rename = require('gulp-rename'),
//     autoprefixer = require('gulp-autoprefixer'),
//     del = require("del"),
//     gutil = require("gulp-util"),
//     gulpif = require("gulp-if"),
//     uglify = require("gulp-uglify"),
//     imagemin = require("gulp-imagemin"),
//     filter = require("gulp-filter"),
//     ftp = require("vinyl-ftp"),
//     wiredep = require("wiredep").stream,
    useref = require("gulp-useref");
    // size = require("gulp-size"),
    // compass = require('gulp-compass'),
    // jade = require('gulp-jade'),
    // plumber = require('gulp-plumber'),
// До выхода gulp 4 версии временное решение
//runSequence = require('run-sequence'),
//     bootlint  = require('gulp-bootlint'),
//Promise = require('es6-promise').Promise,
//     replace = require('gulp-replace'),
//     svgSprite = require('gulp-svg-sprite'),
//     inject = require('gulp-inject');




// * ====================================================== *
//   DEV
// * ====================================================== *


// autoprefixer
// ******************************************************
// gulp.task('autoprefixer', function () {
//     return gulp.src(RS_CONF.path.cssDir)
//         .pipe(autoprefixer({
//             browsers: ['last 6 versions', "ie 8"],
//             cascade: false
//         }))
//         .pipe(gulp.dest(RS_CONF.path.cssDirDest));
// });

// wiredep
// ******************************************************
// gulp.task("wiredep-bower", function () {
//     gulp.src(RS_CONF.path.jadeWiredepSrc)
//         .pipe(wiredep({
//             directory: RS_CONF.path.bowerDir,
//             overrides: {
//                 "qtip2": {
//                     "main": ["./jquery.qtip.min.js", "./jquery.qtip.min.css"],
//                     "dependencies": {
//                         "jquery": ">=1.6.0"
//                     }
//                 },
//                 "bootstrap-sass": {
//                     "main": [
//                         // "./assets/javascripts/bootstrap/collapse.js",
//                         // "./assets/javascripts/bootstrap/transition.js",
//                         // "./assets/javascripts/bootstrap/scrollspy.js",
//                         // "./assets/javascripts/bootstrap/modal.js",
//                         // "./assets/javascripts/bootstrap/tooltip.js"
//                     ]  // подключение bootstrap js в html
//                 },
//                 "formstone": {
//                     "main": [
//                         // "./dist/js/core.js",
//                         // "./dist/js/number.js",
//                         // "./dist/css/number.css",
//                     ]
//                 },
//                 "jquery.inputmask": {
//                     "main": [
//                         // "./dist/inputmask/inputmask.js",
//                         // "./dist/inputmask/inputmask.extensions.js",
//                         // "./dist/inputmask/jquery.inputmask.js",
//                     ]
//                 },
//                 "select2": {
//                     "main": [
//                         // "dist/js/select2.js",
//                         // "dist/css/select2.css"
//                     ],
//                 }
//             },
//             exclude: ["bower/modernizr/", "bower/normalize-css"],  //если надо включить модернизр удали его от сюда
//             ignorePath: /^(\.\.\/)*\.\./
//         }))
//         .pipe(gulp.dest(RS_CONF.path.jadeWiredepDist));
// });







// browsersync front-end
// ******************************************************
// gulp.task("server", ["compass", "wiredep-bower", "autoprefixer", "jade", "bootlint", "create-svg-inline"], function () {
//
//     browserSync.init({
//         port: 3000,
//         open: false,
//         notify: false,
//         server: {
//             baseDir: RS_CONF.path.baseDir
//         }
//     });
//
//     gulp.watch("bower.json", ["wiredep-bower"]);
//     gulp.watch(RS_CONF.path.jadeLocation, ["jade"]);
//     gulp.watch(RS_CONF.path.scssDir, ["compass"]);
//     gulp.watch(RS_CONF.path.cssDir, ["autoprefixer"]).on("change", browserSync.reload);
//     gulp.watch(RS_CONF.path.htmlDir, ["bootlint", "create-svg-inline"]).on("change", browserSync.reload);
//     gulp.watch(RS_CONF.path.jsDir).on("change", browserSync.reload);
// });

// browsersync local-host
// ******************************************************
// gulp.task("local-host", ["compass", "wiredep-bower", "autoprefixer", "jade", "bootlint", "create-svg-inline"], function () {
//
//     browserSync.init({
//         proxy: "projectName/app"
//     });
//
//     gulp.watch("bower.json", ["wiredep-bower"]);
//     gulp.watch(RS_CONF.path.jadeLocation, ["jade"]);
//     gulp.watch(RS_CONF.path.scssDir, ["compass"]);
//     gulp.watch(RS_CONF.path.cssDir, ["autoprefixer"]).on("change", browserSync.reload);
//     gulp.watch(RS_CONF.path.htmlDir, ["bootlint", "create-svg-inline"]).on("change", browserSync.reload);
//     gulp.watch(RS_CONF.path.jsDir).on("change", browserSync.reload);
// });

// default
// ******************************************************
// gulp.task("default", ["server"]);

// local
// ******************************************************
// gulp.task("local", ["local-host"]);
//
// var log = function (error) {
//     console.log([
//         "",
//         "----------ERROR MESSAGE START----------",
//         ("[" + error.name + " in " + error.plugin + "]"),
//         error.message,
//         "----------ERROR MESSAGE END----------",
//         ""
//     ].join("\n"));
//     this.end();
// }




// * ====================================================== *
//   BUILD
// * ====================================================== *


// Переносим CSS JS HTML в папку DIST (useref)
// ******************************************************
gulp.task("useref", function () {
    var condition = 'load.js';

    return gulp.src(RS_CONF.path.htmlDir)
        .pipe(useref())
        .pipe(gulpif("*.js", uglify()))
        .pipe(gulpif("*.css", cleanCSS({
            compatibility: "ie8"
        })))
        .pipe(gulp.dest(RS_CONF.path.distDir));
});



// Очищаем директорию DIST
// ******************************************************
gulp.task("clean-dist", function () {
    return del(RS_CONF.path.distDelDir);
});

// Перенос шрифтов
// ******************************************************
// gulp.task("fonts", function () {
//     gulp.src(RS_CONF.path.fontsDir)
//         .pipe(filter(["*.eot", "*.svg", "*.ttf", "*.woff", "*.woff2"]))
//         .pipe(gulp.dest(RS_CONF.path.distFontsDir))
// });

// Перенос шрифтов bootstrap
// ******************************************************
// gulp.task("bootstrapFonts", function () {
//     gulp.src(RS_CONF.path.bootstrapFontsDir)
//         .pipe(filter(["*.eot", "*.svg", "*.ttf", "*.woff", "*.woff2"]))
//         .pipe(gulp.dest(RS_CONF.path.distBootstrapFontsDir))
// });

// Перенос картинок
// ******************************************************
// gulp.task("images", function () {
//     return gulp.src(RS_CONF.path.imgDir)
//         .pipe(gulpif(["*.jpg", "*.jpeg", "*.png", "*.webp", "*.gif"], imagemin({
//             progressive: true,
//             interlaced: true
//         })))
//         .pipe(filter(["*.jpg", "*.svg", "*.jpeg", "*.png", "*.webp", "*.gif", "!/icons", "!/icons-svg-for-inline"]))
//         .pipe(gulp.dest(RS_CONF.path.distImgDir));
// });

// Перенос остальных файлов (favicon и т.д.)
// ******************************************************
// gulp.task("extras", function () {
//     return gulp.src(RS_CONF.path.extraFiles)
//         .pipe(gulp.dest(RS_CONF.path.distDir));
// });

// Перенос временного(тестового) php
// ******************************************************
// gulp.task("php", function () {
//     return gulp.src(RS_CONF.path.baseDir + "/php/*.php")
//         .pipe(gulp.dest(RS_CONF.path.distDir + "/php"));
// });

// Вывод размера папки APP
// ******************************************************
// gulp.task("size-app", function () {
//     return gulp.src(RS_CONF.path.allAppFiles).pipe(size({
//         title: "APP size: "
//     }));
// });

// Сборка и вывод размера папки DIST
// ******************************************************
// gulp.task("dist", ["useref", "images", "fonts", "bootstrapFonts", "extras", "php", "size-app"], function () {
//     // gulp.start("inject-svg-inline");  // инжект спрайта  в html при сборке build(если надо чтоб спрайт был в html)
//
//     return gulp.src(RS_CONF.path.allDistFiles).pipe(size({
//         title: "DIST size: "
//     }));
// });

// Собираем папку DIST - только когда файлы готовы
// ******************************************************
// gulp.task("build", ["clean-dist", "wiredep-bower"], function () {
//     gulp.start("dist");  // с wiredep-bower
// });
gulp.task("build", ["clean-dist", "wiredep-bower"], function () {
    gulp.start("dist");  // с wiredep-bower
});

// // Запускаем локальный сервер для DIST
// // ******************************************************
// gulp.task("dist-server", function () {
//     browserSync.init({
//         port: 2000,
//         open: true,
//         notify: false,
//         server: {
//             baseDir: RS_CONF.path.distDir
//         }
//     });
// });

