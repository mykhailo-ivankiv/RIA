var gulp = require("gulp");
var babel = require("gulp-babel");

var DIST_FOLDER = "dist";

gulp.task("process-client-scripts", function () {
  return gulp.src(["src/**/*.js", "!src/app.js"])
      .pipe(babel({modules: "amd", optional: ["es7.classProperties"], blacklist: ["useStrict"]}))
      .pipe(gulp.dest(DIST_FOLDER));
});

gulp.task("process-vendor-scripts", function() {
  //Copy vendors lib TODO: fix it
  return gulp.src([
    "node_modules/reflux/dist/reflux.js",
    "node_modules/react/dist/react.js",
    "node_modules/react/dist/react-with-addons.js",
    "node_modules/whatwg-fetch/fetch.js",
    "node_modules/requirejs/require.js"
  ])
  .pipe(gulp.dest(DIST_FOLDER + "/vendors"));
});

gulp.task("process-server-scripts", function() {
  return gulp.src(["src/app.js"])
      .pipe(babel({optional: ["es7.classProperties"]}))
      .pipe(gulp.dest(DIST_FOLDER));
});


gulp.task("process-scripts", ["process-vendor-scripts", "process-client-scripts", "process-server-scripts"])

gulp.task("default", ["process-scripts"]);

gulp.task("watch",["process-scripts"], function() {
  gulp.watch("src/**/*.js", ["process-client-scripts", "process-server-scripts"]);
});