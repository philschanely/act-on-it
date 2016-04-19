var gulp = require('gulp');
var less = require('gulp-less');
var path = require('path');

gulp.task('default', function() {

});
gulp.task('less', function () {
  return gulp.src('./client/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./client/csgus'));
});