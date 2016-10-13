var gulp = require("gulp");
var source = require('vinyl-source-stream');
var babel = require("gulp-babel");
var watch = require("gulp-watch");
var browserify = require("gulp-browserify");

gulp.task("new", function() {
    return watch("./js/app.js", function() {
        gulp.src("./js/app.js")
            .pipe(babel())
            .pipe(browserify())
            .pipe(gulp.dest("dist/js"));
    });
});
