(function () {
    'use strict';

    var baseDir = "./app",
        distBaseDir = "./dist";

    module.exports = {
        path: {
            // App
            baseDir: baseDir,
            cssDir: baseDir + "/*.css",
            cssDirDest: baseDir + "/",
            jsDir: baseDir + "/**/*.js",
            htmlDir: baseDir + "/*.html",
            imgDir: baseDir + "/img/**/*",
            imgDestDir: baseDir + "/img/",
            bowerDir: baseDir + "/bower_components",
            iconDir: baseDir + "/img/",
            extraFiles: [baseDir + "/*.*", "!" + baseDir + "/*.html"],
            allAppFiles: baseDir + "/**/*",
            
            // Dist
            distDir: distBaseDir,
            distCssDir: distBaseDir + "/css/",
            distJsDir: distBaseDir + "/js/",
            distImgDir: distBaseDir + "/img/",
            distDelDir: [distBaseDir + "/**", "!" + distBaseDir],
            allDistFiles: distBaseDir + "/**/*"
        }
    };
})();