var gulp = require("gulp"),
    RS_CONF = require('./rs-conf.js'),
    browserSync = require("browser-sync").create(),
    minifyCss = require('gulp-minify-css'),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    del = require("del"),
    gulpif = require("gulp-if"),
    uglify = require("gulp-uglify"),
    imagemin = require("gulp-imagemin"),
    filter = require("gulp-filter"),
    wiredep = require("wiredep").stream,
    useref = require("gulp-useref"),
    size = require("gulp-size");




// * ====================================================== *
//   DEV
// * ====================================================== *



// autoprefixer
// ******************************************************
gulp.task('autoprefixer', function () {
    return gulp.src(RS_CONF.path.cssDir)
        .pipe(autoprefixer({
            browsers: ['last 2 versions', "ie 8"],
            cascade: false
        }))
        .pipe(gulp.dest(RS_CONF.path.cssDirDest));
});

// wiredep
// ******************************************************
gulp.task("wiredep-bower", function () {
    gulp.src(RS_CONF.path.htmlDir)
        .pipe(wiredep({
            directory: RS_CONF.path.bowerDir,
            overrides: {
                "angular": {
                    "main": [
                        "./angular.min.js"
                    ]
                },
                "angular-hotkeys": {
                    "main": [
                        "./build/hotkeys.min.js"
                    ]
                },
                "angular-resource": {
                    "main": [
                        "./angular-resource.min.js"
                    ]
                },
                "bootstrap": {
                    "main": ["dist/css/bootstrap.css"]  // подключение bootstrap в html
                }
            },
            exclude: ["bower_components/jquery/"],
            ignorePath: /^(\.\.\/)*\.\./
        }))
        .pipe(gulp.dest(RS_CONF.path.baseDir));
});

// browsersync front-end
// ******************************************************
gulp.task("server", ["autoprefixer", "wiredep-bower"], function () {

    browserSync.init({
        port: 9000,
        open: false,
        notify: false,
        server: {
            baseDir: RS_CONF.path.baseDir
        }
    });
    
    gulp.watch("bower.json", ["wiredep-bower"]);
    gulp.watch(RS_CONF.path.cssDir, ["autoprefixer"]).on("change", browserSync.reload);
    gulp.watch(RS_CONF.path.htmlDir).on("change", browserSync.reload);
    gulp.watch(RS_CONF.path.jsDir).on("change", browserSync.reload);

});

// default
// ******************************************************
gulp.task("default", ["server"]);






// * ====================================================== *
//   BUILD
// * ====================================================== *



// Переносим CSS JS HTML в папку DIST (useref)
// ******************************************************
gulp.task("useref", function () {
    var condition = 'load.js';

    return gulp.src(RS_CONF.path.htmlDir)
        .pipe(useref())
        // .pipe(gulpif("*.js", uglify()))
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

// Перенос картинок
// ******************************************************
gulp.task("images", function () {
    return gulp.src(RS_CONF.path.imgDir)
        // .pipe(filter(["*.jpg", "*.svg", "*.jpeg", "*.png", "*.webp", "*.gif"]))
        .pipe(gulp.dest(RS_CONF.path.distImgDir));
});

// Перенос остальных файлов (favicon и т.д.)
// ******************************************************
// gulp.task("extras", function () {
//     return gulp.src(RS_CONF.path.extraFiles)
//         .pipe(gulp.dest(RS_CONF.path.distDir));
// });


// Вывод размера папки APP
// ******************************************************
gulp.task("size-app", function () {
    return gulp.src(RS_CONF.path.allAppFiles).pipe(size({
        title: "APP size: "
    }));
});

// Сборка и вывод размера папки DIST
// ******************************************************
gulp.task("dist", ["useref", "images", "size-app","dist-server"], function () {
    return gulp.src(RS_CONF.path.allDistFiles).pipe(size({
        title: "DIST size: "
    }));
});

// Собираем папку DIST - только когда файлы готовы
// ******************************************************
gulp.task("build", ["clean-dist", "wiredep-bower"], function () {
    gulp.start("dist");
});

// // Запускаем локальный сервер для DIST
// // ******************************************************
gulp.task("dist-server", function () {
    browserSync.init({
        port: 2000,
        open: true,
        notify: false,
        server: {
            baseDir: RS_CONF.path.distDir
        }
    });
});