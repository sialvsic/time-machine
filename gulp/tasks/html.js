var gulp = require('gulp');
var connect = require('gulp-connect');

gulp.task('html', function() {
  gulp.src('./public/*.html')
    .pipe(connect.reload());
});
