// Imports
import path         from 'path'
import gulp         from 'gulp'
import pug          from 'gulp-pug'
import server       from 'browser-sync'
import dartSass     from 'sass'
import gulpSass     from 'gulp-sass'


// Vars
const sass = gulpSass(dartSass)
const __dirname = path.dirname(new URL(import.meta.url).pathname)


// Paths
const dirs = {
  // Markup
  pugPages:         `./src/pug/*.pug`,
  pugAll:           `./src/pug/**/*pug`,

  // Styles
  scssMain:         `./src/scss/style.scss`,
  scssAll:          `./src/scss/**/*.scss`,

  // Code
  jsSrc:            `./src/js/**/*.js`,

  // Resources
  images:           `./src/img/**/*`,
  favicon:          `./src/favicon/**/*`,

  // Distribution
  public:           `./docs`,
}


// Start BrowserSync Server
const startServer = () => {
  server.init({
    // ui: false,
    // notify: false,
    server: {
      baseDir: dirs.public,
    },
    port: 1337,
    ghostMode: {
      clicks: false,
      forms: false,
      location: false,
      scroll: false,
    },
  })
}


// Render html from pug
const renderPug = () => gulp
  .src(dirs.pugPages)
  .pipe(pug({
    pretty: true,
    data: {},
    self: true,
  }))
  .on(`error`, (err) => {
    console.log("\x1b[31m", err.message, "\x1b[0m")
    this.emit(`end`)
  })
  .pipe(gulp.dest(dirs.public))
  .pipe(server.stream())


// Copy assets
const copyAssets = () => gulp
  .src([
    dirs.images,
    dirs.favicon,
  ], {
    base: `src`,
  })
  .pipe(gulp.dest(dirs.public))
  .pipe(server.stream({
    once: true,
  }))


// Compile Styles
const compileStyles = () => gulp
  .src(dirs.scssMain)
  .pipe(sass().on(`error`, sass.logError))
  .pipe(gulp.dest(dirs.public))
  .pipe(server.stream())


// Exports
export const watch = () => {
  gulp.watch(dirs.pugAll, renderPug)
  gulp.watch(dirs.scssAll, compileStyles)
  gulp.watch([
    dirs.images,
    dirs.favicon,
  ], copyAssets)
}

export default gulp.series(
  gulp.parallel(
    renderPug,
    compileStyles,
    copyAssets,
  ),
  gulp.parallel(
    watch,
    startServer,
  ),
)
