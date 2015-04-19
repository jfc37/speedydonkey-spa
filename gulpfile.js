/* jshint camelcase:false */
var gulp = require('gulp');
var pkg = require('./package.json');
var plug = require('gulp-load-plugins')();
var env = plug.util.env;
var log = plug.util.log;
var replace = require('gulp-replace');

var dotenv = require('dotenv');
dotenv.load();

gulp.task('help', plug.taskListing);

//get angular config file
//get environment values
//find and replace file

gulp.task('environmnet-setup', function() {

    //var dotenv = require('dotenv');
    //dotenv.load();
    log('Setting up environment');

    gulp.src(['config.js'])
    .pipe(replace(/<company>/g, process.env.Company))
    .pipe(replace(/<apiUrl>/g, process.env.ApiUrl))
    .pipe(gulp.dest('src/client/app/core'));

});

gulp.task('default', ['environmnet-setup'], function(){
    gulp.start('environmnet-setup');
});

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