var gulp = require('gulp'),
    concat = require('gulp-concat'),
    //connect = require('gulp-connect'),
    nodemon = require('gulp-nodemon'),
    mainBowerFiles = require('main-bower-files'),
    less = require('gulp-less'),
    jshint = require('gulp-jshint'),
    //karma = require('karma').server,
    sourcemaps = require('gulp-sourcemaps'),
    del = require('del'),
    uglify = require('gulp-uglify'),
    cleanCSS = require('gulp-clean-css'),
    gulpFilter = require('gulp-filter'),
    ngAnnotate = require('gulp-ng-annotate');
    //tar = require('gulp-tar'),
    //gzip = require('gulp-gzip'),
    //p = require('./package.json');

var paths = {
    styles: ['./client/app/styles/main.less','!./client/app/styles/bootstrap-overrides.less'],
    scripts: ['./client/app/**/*.js'],
    html: ['./client/app/views/**/*.html']
    // tests: ['./tests/*.js'],
    // config: ['./config/*.json']
};

// clean
gulp.task('clean', function () {
    return del([
        './client/build/**/*',
        './client/dist/**/*'
    ]);
});

// vendor scripts and css
gulp.task('bower', ['clean'], function () {
    var jsFilter = gulpFilter('*.js', {restore: true});
    var cssFilter = gulpFilter(['*.css','*.less'], {restore: true});
    var imageFilter = gulpFilter(['*.jpg','*.png'], {restore: true});

    var vendorScripts = mainBowerFiles({ paths: './client'});

    return gulp.src(vendorScripts)
        // js
        .pipe(jsFilter)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./client/build/scripts'))
        .pipe(jsFilter.restore)

        // css
        .pipe(cssFilter)
        .pipe(less())
        .pipe(concat('bower.css'))
        .pipe(gulp.dest('./client/.tmp'))
        .pipe(cssFilter.restore)

        // images
        .pipe(imageFilter)
        .pipe(gulp.dest('./client/build/styles/images'))
        .pipe(cssFilter.restore);
});

// handle bootstrap separately to facilitate bootstrap overrides
// copy bootstrap mixins
gulp.task('bootstrapMixins', ['bower'], function () {
    return gulp.src('./client/bower_components/bootstrap/less/mixins/*.less')
        .pipe(gulp.dest('./client/.tmp/bootstrap/mixins'));
});

// copy bootstrap less files
gulp.task('bootstrap', ['bootstrapMixins'], function () {
    return gulp.src('./client/bower_components/bootstrap/less/*.less')
        .pipe(gulp.dest('./client/.tmp/bootstrap'));
});

// concat bootstrap variables and custom bootstrap override variables
gulp.task('bootstrapVariables', ['bootstrap'], function () {
    return gulp.src(['./client/bower_components/bootstrap/less/variables.less','./client/app/styles/bootstrap-overrides.less'])
        .pipe(concat('variables.less'))
        .pipe(gulp.dest('./client/.tmp/bootstrap'));
});

// compile bootstrap less
gulp.task('compileBootstrap', ['bootstrapVariables'], function () {
    return gulp.src('./client/.tmp/bootstrap/bootstrap.less')
        .pipe(less())
        .pipe(gulp.dest('./client/.tmp'))
});

// concat bootstrap and other bower css
gulp.task('vendor', ['compileBootstrap'], function () {
    return gulp.src(['./client/.tmp/bower.css', './client/.tmp/bootstrap.css'])
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('./client/build/styles'));
});

// vendor fonts
gulp.task('fontawesome', ['clean'], function () {
    return gulp.src('./client/bower_components/fontawesome/fonts/**/*.{otf,eot,woff,woff2,svg,ttf}')
        .pipe(gulp.dest('./client/build/fonts'));
});

gulp.task('glyphicons', ['clean'], function () {
    return gulp.src('./client/bower_components/bootstrap/fonts/**/*.{otf,eot,woff,woff2,svg,ttf}')
        .pipe(gulp.dest('./client/build/fonts'));
});

gulp.task('vendor-fonts', ['fontawesome','glyphicons']);

gulp.task('vendor-build', ['vendor', 'vendor-fonts'], function () {
    return del([
        './client/.tmp'
    ]);
});

// app
var appJs = function () {
    return gulp.src(paths.scripts)
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate({ single_quotes: true }))
        .pipe(sourcemaps.write())
        //.pipe(connect.reload())
        .pipe(gulp.dest('./client/build/scripts'));
};
gulp.task('app-js', ['clean'], appJs);
gulp.task('app-js-watch', appJs);

// var appConfig = function () {
//     return gulp.src(paths.config)
//         .pipe(gulp.dest('./client/build/config'));
// };
// gulp.task('app-config', ['clean'], appConfig);

var appHtml = function () {
    return gulp.src(paths.html)
        //.pipe(connect.reload())
        .pipe(gulp.dest('./client/build/views'));
};
gulp.task('app-html', ['clean'], appHtml);
gulp.task('app-html-watch', appHtml);

var appCss = function () {
    return gulp.src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(sourcemaps.write())
        //.pipe(connect.reload())
        .pipe(gulp.dest('./client/build/styles'));
};
gulp.task('app-css', ['clean'], appCss);
gulp.task('app-css-watch', appCss);

//gulp.task('app-build', ['app-js', 'app-config', 'app-html', 'app-css']);
gulp.task('app-build', ['app-js', 'app-html', 'app-css']);

// code linting
gulp.task('lint', function () {
    return gulp.src(paths.scripts)
        .pipe(jshint({ devel: true, debug: true }))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

// // tests
// gulp.task('test', function (done) {
//     karma.start({
//         configFile: 'karma.conf.js',
//         singleRun: true
//     }, done);
// });

// dev server
// gulp.task('connect', ['build'], function () {
//     connect.server({
//         port: 3000,
//         root: 'build',
//         livereload: true
//     });
// });

// // watch files
// gulp.task('watch', ['connect'], function () {
//     gulp.watch(paths.html, ['app-html-watch']);
//     gulp.watch(paths.scripts, ['lint', 'app-js-watch']);
//     gulp.watch(paths.styles, ['app-css-watch']);
// });

// build
gulp.task('build', ['vendor-build', 'app-build', 'lint'], function () {
    return gulp.src('./client/app/index.html')
        .pipe(gulp.dest('./client/build'));
});

// copy build files to dist
gulp.task('dist-copy', ['build'], function () {
    return gulp.src('./client/build/**/*')
        .pipe(gulp.dest('./client/dist'));
});

// uglify dist files
gulp.task('uglify-vendor-js', ['dist-copy'], function () {
    gulp.src('./client/dist/scripts/vendor.js')
        .pipe(uglify())
        .pipe(gulp.dest('./client/dist/scripts'));
});

gulp.task('uglify-app-js', ['dist-copy'], function () {
    gulp.src('./client/dist/scripts/app.js')
        .pipe(uglify())
        .pipe(gulp.dest('./client/dist/scripts'));
});

gulp.task('uglify-app-css', ['dist-copy'], function () {
    gulp.src('./client/dist/styles/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./client/dist/styles'));
});

// main dist task
gulp.task('dist', ['uglify-vendor-js', 'uglify-app-js', 'uglify-app-css']);

// // deploy
// gulp.task('deploy-ngwordpress', ['dist'], function () {
//     return gulp.src('./client/dist/**/*')
//         .pipe(gulp.dest('./ngwordpress')) // this will be the name of the directory inside the archive
//         .pipe(tar('ngwordpress' + p.version + '.tar'))
//         .pipe(gzip())
//         .pipe(gulp.dest('./deploy'));
// });
//
// gulp.task('deploy', ['deploy-ngwordpress'], function () {
//     return del([
//         './ngwordpress'
//     ]);
// });

gulp.task('dev-server', ['build'], function () {
    nodemon({ script: './server.js',
        ext: 'html js',
        tasks: ['lint'] })
        .on('restart', function () {
            console.log('restarted!')
        });
});

// default gulp task
gulp.task('default', ['dev-server']);