/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');
var errorHandler = require('./src/server/utils/errorHandler')();
var four0four = require('./src/server/utils/404')();
var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 7203;
var routes;

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());
app.use(errorHandler.init);

if (environment !== 'spec') {
    applySecruity(app);
}

routes = require('./src/server/routes/index')(app);

console.log('About to crank up node');
console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

app.get('/ping', function (req, res, next) {
    console.log(req.body);
    res.send('pong');
});

switch (environment) {
case 'build':
    console.log('** BUILD **');
    app.use(express.static('./build/'));
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function (req, res, next) {
        four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./build/index.html'));
    break;
default:
    console.log('** DEV **');
    app.use(express.static('./src/client/'));
    app.use(express.static('./'));
    app.use(express.static('./.tmp'));
    // All the assets are served at this point.
    // Any invalid calls for templateUrls are under app/* and should return 404
    app.use('/app/*', function (req, res, next) {
        four0four.send404(req, res);
    });
    // Any deep link calls should return index.html
    app.use('/*', express.static('./src/client/index.html'));
    break;
}

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
});

function applySecruity(app) {
    var hsts = require('hsts');
    var nosniff = require('dont-sniff-mimetype');
    var frameguard = require('frameguard');
    var ienoopen = require('ienoopen');
    var xssFilter = require('x-xss-protection');

    //Remove X-Powered-By header
    app.disable('x-powered-by');

    //Set X-Content-Type-Options header to no-sniff
    app.use(nosniff());

    //Set X-Frame-Options to stop site being put in any frame
    app.use(frameguard('deny'));

    //Set X-Download-Options header
    app.use(ienoopen());

    //Set X-XSS-Protection header
    app.use(xssFilter());

    var ninetyDaysInMilliseconds = 7776000000;
    //Add Strict-Transport-Security header to force https
    app.use(hsts({
        maxAge: ninetyDaysInMilliseconds,
        includeSubDomains: true,
        force: true,
        preload: true
    }));

    setupCsp(app);
}

function setupCsp(app) {
    var csp = require('helmet-csp');

    var apiUrl = process.env.ApiUrl || 'api-speedydonkey.azurewebsites.net';

    var defaultSrc = ["'self'", "'unsafe-inline", 'https://fonts.googleapis.com', 'www.google-analytics.com/analytics.js'];
    var scriptSrc = ["'self'", "''unsafe-inline'", "'sha256-KxtbH1VwpjLMD-dX6JwdnF45uYE_xmwRym1XFjtAifg='", "'sha256-SCss7iChG-zqlqUaonanbpCZUyj_jbf5LKHb5pPDpLU='", 'cdn.raygun.io', 'www.google-analytics.com', 'cdn.au.auth0.com', 'jfc.au.auth0.com', 'jfc-dev.au.auth0.com'];
    var fontSrc = ["'self'", 'fonts.gstatic.com', 'cdn.auth0.com', 'data:'];
    var imgSrc = ['*', 'data:']; //["'self", 'www.google-analytics.com', 'data:', 'www.gravatar.com'];
    var styleSrc = ["'self'", "'unsafe-inline", 'fonts.googleapis.com'];
    var connectSrc = ["'self'", apiUrl, 'cdn.raygun.io', 'api.raygun.io', 'jfc.au.auth0.com', 'jfc-dev.au.auth0.com'];
    var reportUri = 'report-uri.io/report/cb45e022bf5061dd8d8fc15e2abdad4e';

    if (isDev()) {
        connectSrc = connectSrc.concat(['ws://localhost:3000']);
    }

    //Add CSP header to only allow trusted scripts and content
    app.use(csp({
        defaultSrc: defaultSrc,
        scriptSrc: scriptSrc,
        fontSrc: fontSrc,
        imgSrc: imgSrc,
        styleSrc: styleSrc,
        connectSrc: connectSrc,
        reportUri: reportUri
    }));
}

function isDev() {
    return environment !== 'build';
}
