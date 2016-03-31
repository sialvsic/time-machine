var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('less', function() {
  console.log('less build')
  gulp.src('./source/less/*.less')
    .pipe(less())
    .pipe(gulp.dest('./public/css'))
});
