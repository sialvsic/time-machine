var gulp = require('./gulp')([
  'connect',
  'html',
  'less',
  'watch-less',
  'watchify',
  'watch',
  'browserify'
]);

gulp.task('build', ['less', 'browserify']);
gulp.task('default', ['build', 'connect', 'watch', 'watch-less', 'watchify']);
