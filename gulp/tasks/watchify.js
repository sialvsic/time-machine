var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var glob = require('glob');
var es = require('event-stream');
var sourcemaps = require('gulp-sourcemaps');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var watchify = require('watchify');

gulp.task('watchify', function (done) {
  glob('./source/scripts/*.js', function (err, files) {
    if (err) done(err);

    var tasks = files.map(function (entry) {


      var browserifyOpts = {
        entries: [entry],
        debug: true,
        insertGlobals: true,
        detectGlobals: false
      };

      //var w = watchify(browserify(browserifyOpts)
      //    .transform('babelify', {
      //      presets: ['es2015', 'react']
      //    })
      //    .add("babel/polyfill")
      //);


      //browserify([require.resolve("babel/polyfill"), entryPoint]

      //browserify(["babel/polyfill", [entry]], { debug: true })

      var w = watchify(browserify(browserifyOpts)
          .transform(babelify.configure({
            presets: ['es2015', 'react'],
            plugins: ['transform-async-to-generator']
          }))
      );
      //var w = watchify(browserify(browserifyOpts)
      //    .transform('babelify', {
      //      presets: ['es2015', 'react'],
      //      externalHelpers: true, // 不将babel的helper代码插入到模块中
      //      stage: 4 // 该模式能支持诸如static关键字等ES7的特性
      //    }));

      (function (w, entry) {
        w.on('update', function () {
          var start = new Date().getTime();
          console.log('Start fast build...');

          w.bundle()
              .pipe(source(entry))
              .pipe(rename(function (path) {
                path.dirname = "";
              }))
              .pipe(gulp.dest('./public/scripts/'))
              .on('end', function () {
                console.log('Complete fast build...' + (new Date().getTime() - start) + 'ms');
              });
        })
      })(w, entry);

      return w.bundle()
          .pipe(source(entry))
          .pipe(rename(function (path) {
            path.dirname = "";
          }))
          .pipe(gulp.dest('./public/scripts/'));
    });

    es.merge(tasks).on('end', done);
  })
});
