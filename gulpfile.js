/* jshint camelcase:false */
var gulp = require('gulp');
var pkg = require('./package.json');
var plug = require('gulp-load-plugins')();
var env = plug.util.env;
var log = plug.util.log;
var replace = require('gulp-replace');
var expect = require('gulp-expect-file');

var fs = require('fs');
var path = require('path');
var merge = require('merge-stream');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var streamqueue  = require('streamqueue');

//var dotenv = require('dotenv');
//dotenv.load();

gulp.task('help', plug.taskListing);

var scriptsPath = 'src/client/app';
var buildPath = 'src/build';

gulp.task('module-scripts', function() {
    return streamqueue({ objectMode: true },
        gulp.src(scriptsPath + '/app.module.js'),
        gulp.src(scriptsPath + '/blocks/**/*.module.js'),
        gulp.src(scriptsPath + '/core/*.module.js'),
        gulp.src(scriptsPath + '/**/*.module.js'),
        gulp.src(scriptsPath + '/**/*.js')
    )
    .pipe(concat('/'))
    .pipe(gulp.dest(buildPath + '/app.module.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildPath + '/app.module.min.js'));
 });

gulp.task('route-scripts', function() {
    return streamqueue({ objectMode: true },
        gulp.src(scriptsPath + '/**/config.route.js')
    )
    .pipe(concat('/'))
    .pipe(gulp.dest(buildPath + '/app.route.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildPath + '/app.route.min.js'));
 });

gulp.task('app-scripts', function() {
    return streamqueue({ objectMode: true },
        gulp.src([
            scriptsPath + '/**/*.js',
            '!' + scriptsPath + '/**/*.module.js',
            '!' + scriptsPath + '/**/config.route.js',
        ])
    )
    .pipe(concat('/'))
    .pipe(gulp.dest(buildPath + '/app.js')).pipe(uglify())
    .pipe(gulp.dest(buildPath + '/app.min.js'));
 });

gulp.task('vendor-scripts', function() {
    return streamqueue({ objectMode: true },
        gulp.src('/bower_components/jquery/dist/jquery.js'),
        gulp.src('/bower_components/angular/angular.js'),
        gulp.src('/bower_components/angular-bootstrap/ui-bootstrap-tpls.js'),
        gulp.src('/bower_components/angular-animate/angular-animate.js'),
        gulp.src('/bower_components/angular-route/angular-route.js'),
        gulp.src('/bower_components/angular-sanitize/angular-sanitize.js'),
        gulp.src('/bower_components/angular-cookies/angular-cookies.js'),
        gulp.src('/bower_components/bootstrap/dist/js/bootstrap.js'),
        gulp.src('/bower_components/toastr/toastr.js'),
        gulp.src('/bower_components/extras.angular.plus/ngplus-overlay.js'),
        gulp.src('/bower_components/angular-ui-bootstrap-datetimepicker/datetimepicker.js')
    )
    .pipe(concat('/'))
    .pipe(gulp.dest(buildPath + '/vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest(buildPath + '/vendor.min.js'))
    ;
 });


//get angular config file
//get environment values
//find and replace file

gulp.task('environmnet-setup', function() {

    //var dotenv = require('dotenv');
    //dotenv.load();
    log('Setting up environment');
    log('Changing company to: ' + process.env.Company);
    log('Changing api url to: ' + process.env.ApiUrl);

    gulp.src(['config.js'])
    .pipe(expect('config.js'))
    .pipe(replace(/<company>/g, process.env.Company))
    .pipe(replace(/<apiUrl>/g, process.env.ApiUrl))
    .pipe(gulp.dest('src/client/app/core'))
    .pipe(expect('src/client/app/core/config.js'));

    log('Finished changing all the things');

});

gulp.task('default', ['environmnet-setup', 'module-scripts', 'route-scripts', 'app-scripts', 'vendor-scripts']);
//gulp.task('default', ['module-scripts', 'route-scripts', 'app-scripts', 'vendor-scripts', 'serve-dev']);

/**
 * @desc Lint the code
 */
gulp.task('jshint', function () {
    log('Linting the JavaScript');

    var sources = [].concat(pkg.paths.js, pkg.paths.nodejs);
    return gulp
        .src(sources)
        .pipe(plug.jshint('node_modules/gulp-jshint/.jshintrc'))
        .pipe(plug.jshint.reporter('jshint-stylish'));
});

/**
 * @desc Watch files and run jshint
 */
gulp.task('spy', function () {
    log('Watching JavaScript files');

    var js = ['gulpfile.js'].concat(pkg.paths.js);

    gulp
        .watch(js, ['jshint'])
        .on('change', logWatch);

    function logWatch(event) {
        log('*** File ' + event.path + ' was ' + event.type + ', running tasks...');
    }
});

/**
 * serve the dev environment
 */
gulp.task('serve-dev', function () {
    serve({env: 'dev'});
    startLivereload('development');
});

function startLivereload(env) {
    var path = [pkg.paths.client + '/**'];
    var options = {auto: true};
    plug.livereload.listen(options);
    gulp
        .watch(path)
        .on('change', function (file) {
            plug.livereload.changed(file.path);
        });
    log('Serving from ' + env);
}

function serve(args) {
    var options = {
        script: pkg.paths.server + 'app.js',
        delayTime: 1,
        ext: 'html js',
        env: {'NODE_ENV': args.env},
        watch: ['gulpfile.js',
                'package.json',
                pkg.paths.server,
                pkg.paths.client]
    };

    return plug.nodemon(options)
        .on('restart', function () {
            log('restarted!');
        });
}