const {src, series, dest, watch} = require('gulp'),
      concat = require('gulp-concat'),
      htmlMin = require('gulp-htmlmin'),
      autoprefixer = require('gulp-autoprefixer'),
      cleanCSS = require('gulp-clean-css'),
      svgSprite = require('gulp-svg-sprite'),
      image = require('gulp-image'),
      uglify = require('gulp-uglify-es').default,
      babel = require('gulp-babel'),
      gulpIf = require('gulp-if'),
      realFavicon = require('gulp-real-favicon'),
      webp = require('gulp-webp'),
      sass = require('gulp-sass')(require('sass')),
      argv = require('yargs').argv,
      notify = require('gulp-notify'),
      sourcemaps = require('gulp-sourcemaps'),
      del = require('del'),
      browserSync = require('browser-sync'),
      fs = require('fs'),
      fileinclude = require('gulp-file-include'),
      FAVICON_DATA_FILE = 'faviconData.json';

const clean = () => {
  return del(['dist']);
};

const libs = () => {
  return src('./src/libs/**')
    .pipe(dest('./dist/libs/'));
};

const fonts = () => {
  return src('./src/fonts/**')
    .pipe(dest('./dist/fonts/'));
};

const generateFavicon = (done) => {
  realFavicon.generateFavicon({
    masterPicture: './src/favicon.svg',
    dest: './dist/',
    iconsPath: '/',
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#ffffff',
        margin: '21%'
      },
      desktopBrowser: {
        pictureAspect: 'whiteSilhouette',
        backgroundColor: '#da532c',
        margin: 'override'
      },
      androidChrome: {
        pictureAspect: 'shadow',
        themeColor: '#ffffff',
        manifest: {
          name: 'PUGOFKA',
          display: 'browser',
          orientation: 'notSet',
          onConflict: 'override'
        }
      },
      safariPinnedTab: {
        pictureAspect: 'silhouette',
        themeColor: '#5bbad5'
      }
    },
    settings: {
      compression: 5,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    markupFile: FAVICON_DATA_FILE
  }, () => {
    done();
  });
};

const checkForFaviconUpdate = (done) => {
  const currentVersion = JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).version;
  realFavicon.checkForUpdates(currentVersion, function(err) {
    if (err) {
      throw err;
    };
  });
};

const html = () => {
  return src('./src/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(htmlMin({
      collapseWhitespace: true
    }))
    .pipe(dest('./dist/'))
}

const styles = () => {
  return src('./src/styles/**/*.scss')
    .pipe(gulpIf(!argv.prod, sourcemaps.init()))
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(gulpIf(argv.prod, cleanCSS({
      level: 2
    })))
    .pipe(gulpIf(!argv.prod, sourcemaps.write()))
    .pipe(dest('./dist/styles/'))
    .pipe(browserSync.stream());
};

const svgSprites = () => {
  return src('./src/img/svg/**/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(dest('./dist/img/'))
    .pipe(browserSync.stream());
};

const scripts = () => {
  return src('./src/js/**/*.js')
    .pipe(gulpIf(!argv.prod, sourcemaps.init()))
    .pipe(gulpIf(argv.prod, babel({
      presets: ['@babel/env']
    })))
    .pipe(gulpIf(argv.prod, uglify().on('error', notify.onError())))
    .pipe(gulpIf(!argv.prod, sourcemaps.write()))
    .pipe(dest('./dist/js'))
    .pipe(browserSync.stream());
};

const images = () => {
  return src([
      './src/img/**/*.jpg',
      './src/img/**/*.png',
      './src/img/*.svg',
      './src/img/**/*.jpeg'
    ])
    .pipe(image())
    .pipe(dest('./dist/img/'))
    .pipe(webp())
    .pipe(dest('./dist/img/'))
    .pipe(browserSync.stream());
};

const watchFiles = () => {
  gulpIf(!argv.prod, browserSync.init({
    server: {
      baseDir: './dist/'
    }
  }));
};

watch('./src/**/*.html', html);
watch('./src/styles/**/*.scss', styles);
watch('./src/img/svg/**/*.svg', svgSprites);
watch('./src/js/**/*.js', scripts);
watch(['./src/img/**/*.jpg', './src/img/**/*.png', './src/img/*.svg', './src/img/**/*.jpeg'], images);
watch('./src/libs/**', libs);

exports.default = series(
  clean, fonts, libs, generateFavicon,
  html, styles, svgSprites, scripts,
  images, watchFiles, checkForFaviconUpdate
);
