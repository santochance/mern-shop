const gulp = require('gulp')
const plumber = require('gulp-plumber')
const sass = require('gulp-sass')

let config = {
  SCSS_SRC: 'src/scss/**/*.scss',
  SASS_SRC: 'src/sass/**/*.sass',
  CSS_DEST: 'src'
}

gulp.task('toCss', () => {
  return gulp.src(config.SCSS_SRC)
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest(config.CSS_DEST))
})

gulp.task('sassToCss', () => {
  return gulp.src(config.SASS_SRC)
    .pipe(plumber())
    .pipe(sass({indentedSyntax: true}))
    .pipe(gulp.dest(config.CSS_DEST))
})

gulp.task('watch', ['toCss', 'sassToCss'], () => {
  gulp.watch(config.SCSS_SRC, ['toCss'])
  gulp.watch(config.SASS_SRC, ['sassToCss'])
})
