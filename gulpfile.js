'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');
var winston = require('winston');
var eslint = require('gulp-eslint');
var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var rev = require('gulp-rev');

var paths = {
    js: ['gulpfile.js', 'app/**/*.js'],
    html: ['app/**/*.html', 'index.html'],
    css: ['assets/css/*.css'],
    img: ['assets/img/*'],
    data: ['app/**/*.json'],
    fonts: ['node_modules/patternfly/dist/fonts/*']
};

// run on port 8181 for local development to prevent java app server backend port conflicts
var exposePort;
var runtime;
var backend;

if (process.env.NPM_RUN) {
    exposePort = 8080;
    runtime = 'OpenShift';
    backend = 'http://eap-service:8080'

} else {
    exposePort = 8181;
    runtime = 'local';
    backend = 'http://localhost:8080'
}

winston.info('Running on %s, setting port to %s \n', runtime, exposePort);

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('eslint', function () {
    return gulp.src(paths.js)
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

gulp.task('server:dev', function () {
    connect.server({
        root: ['.'],
        livereload: true,
        port: exposePort,
        middleware: function () {
            var apiProxy = proxy('/jboss-api', {
                target: backend
            });

            return [apiProxy];
        }
    });
});

gulp.task('server:prod', function () {
    connect.server({
        root: ['dist'],
        port: exposePort,
        middleware: function () {
            var apiProxy = proxy('/odata4', {
                target: backend
            });

            return [apiProxy];
        }
    });
});

gulp.task('reload', function () {
    gulp.src(paths.html)
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(paths.html, ['reload']);
    gulp.watch(paths.css, ['reload']);
    gulp.watch(paths.js, ['eslint', 'reload']);
});

gulp.task('copy:html', function () {
    return gulp.src(paths.html, {base: '.'})
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:data', function () {
    return gulp.src(paths.data, {base: '.'})
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:img', function () {
    return gulp.src(paths.img, {base: '.'})
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('dist/assets/fonts'));
});

gulp.task('usemin', function () {
    return gulp.src(paths.html)
        .pipe(usemin({
            css: [cleanCss, rev],
            js: [uglify, rev]
        }))
        .pipe(gulp.dest('dist/'));
});

gulp.task('build', function () {
    runSequence(['clean', 'eslint'], ['copy:html', 'copy:img', 'copy:fonts', 'copy:data', 'usemin']);
});

gulp.task('dev', function () {
    runSequence('eslint', ['server:dev', 'watch']);
});

gulp.task('prod', function () {
    runSequence('build', 'server:prod');
});

gulp.task('default', ['dev']);
