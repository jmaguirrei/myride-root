
const gulp = require('gulp');
const rollup = require('gulp-better-rollup');
const minify = require('gulp-minify');
const rename = require('gulp-rename');
const shell = require('gulp-shell');
const del = require('del');
const babel = require('rollup-plugin-babel');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const builtins = require('rollup-plugin-node-builtins');

/* --------------------------------------------------------------------------------------------- */

const babelPlugins = isProduction => {
  const base = [
    [ 'module-resolver', { root: [ './' ], alias: { '@root': './', '@libs': '../../../libs' }} ],
    [ 'transform-react-jsx', { pragma: 'client.h' } ],
  ];
  if (!isProduction) return base;
  return [
    ...base,
    [ '../../../libs/babel/src/remove-classes-in-bundle.js' ]
  ];
};

const plugins = isProduction => {
    console.log("babelPlugins(isProduction)", babelPlugins(isProduction));
  return [
    babel({ plugins: babelPlugins(isProduction) }),
    builtins(),
    resolve(),
    commonjs(),
  ];
};

const Domains = {
  // Base folder - watchSrc - indexFile
  client: [ '../../../libs/client', 'src/**/*.js', 'index.js' ],
  sw: [ './js/sw', '**/*.js', 'index.js' ],
  www: [ '../www/src', '**/*.js', 'client/main.js' ],
  sign: [ '../sign/src', '**/*.js', 'client/main.js' ],
  app: [ '../app/src', '**/*.js', 'client/main.js' ],
};

/* --------------------------------------------------------------------------------------------- */

const Factory = {};

Factory.bDev = (fileName, indexFile, isProduction) => gulp.series(
  () => del(`js/dev/${fileName}.js`),
  () => gulp.src(indexFile, { base: './dev' })
  .pipe(rollup({ plugins: plugins(isProduction) }, 'es'))
  .pipe(rename(`${fileName}.js`))
  .pipe(gulp.dest('js/dev'))
);

Factory.bPro = fileName => gulp.series(
  () => gulp.src(`js/dev/${fileName}.js`)
  .pipe(minify({ ext: { min: '.prod.js' }}))
  .pipe(gulp.dest('js/prod')),
  () => gulp.src(`js/prod/${fileName}.prod.js`)
  .pipe(rename(`${fileName}.js`))
  .pipe(gulp.dest('js/prod')),
  () => del(`js/prod/${fileName}.prod.js`)
);

/* --------------------------------------------------------------------------------------------- */

const Tasks = {};

Tasks.bDev = isProduction => Object.keys(Domains).reduce((acum, key) => ({
  ...acum,
  [key]: Factory.bDev(key, `${Domains[key][0]}/${Domains[key][2]}`, isProduction),
}), {});

Tasks.bPro = Object.keys(Domains).reduce((acum, key) => ({
  ...acum,
  [key]: Factory.bPro(key),
}), {});

/* --------------------------------------------------------------------------------------------- */

exports.watch = gulp.parallel(Object.keys(Domains).map(key => {
  const watchSrc = `${Domains[key][0]}/${Domains[key][1]}`;
  return () => gulp.watch(watchSrc, { ignoreInitial: false }, Tasks.bDev(false)[key]);
}));

exports.bundle = gulp.series([
  Object.keys(Domains).map(key => gulp.series(Tasks.bDev(true)[key], Tasks.bPro[key])),
  shell.task('bash update.sh'),
]);

