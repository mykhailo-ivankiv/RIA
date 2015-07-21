var gulp = require("gulp");
var babel = require("gulp-babel");
var plumber = require("gulp-plumber");
var sass = require('gulp-sass');

// For CSS
var autoprefixer = require("gulp-autoprefixer");

var DIST_FOLDER = "dist";

gulp.task("process-mock", function () {
  return gulp.src(["src/mock/**/*.json"])
      .pipe(gulp.dest(DIST_FOLDER + "/mock"))
});

gulp.task("process-style", function () {
  return gulp.src(["src/**/*.scss"])
      .pipe(plumber())

        .pipe(sass())
        .pipe(autoprefixer({
          browsers: ["last 2 versions"],
          cascade: false
        }))
      .pipe(plumber.stop())
      .pipe(gulp.dest(DIST_FOLDER))
});

gulp.task("process-client-scripts", function () {
  return gulp.src(["src/**/*.js", "!src/app.js"])
      .pipe(plumber())
        .pipe(babel({modules: "amd", optional: ["es7.classProperties"], blacklist: ["useStrict"]}))
      .pipe(plumber.stop())
      .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task("process-vendor-scripts", function() {
  //Copy vendors lib TODO: fix it
  return gulp.src([
    "node_modules/reflux/dist/reflux.js",
    "node_modules/react/dist/react.js",
    "node_modules/react/dist/react-with-addons.js",
    "node_modules/whatwg-fetch/fetch.js",
    "node_modules/requirejs/require.js",
    "node_modules/immutable/dist/immutable.min.js"
  ])
  .pipe(gulp.dest(DIST_FOLDER + "/vendors"));
});

gulp.task("process-server-scripts", function() {
  return gulp.src(["src/app.js"])
      .pipe(plumber())
        .pipe(babel({optional: ["es7.classProperties"]}))
      .pipe(plumber.stop())
      .pipe(gulp.dest(DIST_FOLDER));
});


gulp.task("process-scripts", ["process-vendor-scripts", "process-client-scripts", "process-server-scripts"])

gulp.task("default", ["process-scripts"]);

gulp.task("watch",["process-scripts", "process-style", "process-mock"], function() {
  gulp.watch("src/**/*.js", ["process-client-scripts", "process-server-scripts"]);
  gulp.watch("src/**/*.scss", ["process-style"]);
  gulp.watch("src/mock/**/*.json", ["process-mock"]);
});