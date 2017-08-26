const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')

let config = {
  SCSS_SRC: 'src/scss/**/*.scss',
  SCSS_DEST: 'src'
}

gulp.task('toCss', () => {
  return gulp.src(config.SCSS_SRC)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(config.SCSS_DEST))
})

gulp.task('watch', ['toCss'], () => {
  gulp.watch('src/scss/**/*.scss', ['toCss'])
})
