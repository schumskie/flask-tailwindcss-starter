const { src,watch, dest, parallel, series } = require('gulp');
const babel = require('gulp-babel');
const named = require('vinyl-named');
const del = require("del");
const rev = require('gulp-rev');
const gulpif = require('gulp-if');
const postcss = require('gulp-postcss');
var revDel = require('rev-del');
const webpack = require('webpack-stream');
var compiler = require('webpack');
var source = require('vinyl-source-stream');
var { nodeResolve } = require('@rollup/plugin-node-resolve');

function isJavaScript(file) {
    // Check if file extension is '.js'
    return file.extname === '.js';
}
function isCss(file) {
    // Check if file extension is '.js'
    return file.extname === '.css';
}

const mode = process.env.NODE_ENV || 'development'

function clean() {
    return del(['app/static/gulp', 'app/static/rev-manifest.json'])
}
function css() {
    return src('assets/css/main.css')
        .pipe(postcss())
        .pipe(rev())
        .pipe(dest('app/static/gulp/'))
        .pipe(rev.manifest('app/static/rev-manifest.json', {merge: true, base:"app/static/gulp/"}))
        .pipe(dest('app/static/gulp/'));
}


function js() {
    return src('assets/js/swiper.js')
        .pipe(named())
        .pipe(webpack({mode, output: {library: 'Swiper', libraryTarget: 'var', libraryExport: 'default'}}, compiler))
        .pipe(rev())
        .pipe(dest('app/static/gulp/'))
        .pipe(rev.manifest('app/static/rev-manifest.json', {merge: true, base:"app/static/gulp/"}))
        .pipe(dest('app/static/gulp/'));
}

function copy() {
    return src('assets/img/*', {base : 'assets'})
        .pipe(rev())
        .pipe(dest('app/static/gulp/'))
        .pipe(rev.manifest('app/static/rev-manifest.json', {merge: true, base:"app/static/gulp/"}))
        .pipe(dest('app/static/gulp/'));
}

function copyLibs() {
    return src('assets/libs/swiper/package/swiper-bundle.min.js')
        .pipe(rev())
        .pipe(dest('app/static/gulp/'))
        .pipe(rev.manifest('app/static/rev-manifest.json', {merge: true, base:"app/static/gulp/"}))
        .pipe(dest('app/static/gulp/'));
}

exports.js = js
exports.clean = clean
exports.css = css
exports.default = series(clean, parallel(css, copy))
exports.watch = function (cb) {
    watch(['assets/css/*'], exports.default)
    cb()
}
