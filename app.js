/*jshint node:true*/
'use strict';

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var compress = require('compression');
var cors = require('cors');

var hsts = require('hsts');
var csp = require('helmet-csp');
var nosniff = require('dont-sniff-mimetype');
var frameguard = require('frameguard');
var ienoopen = require('ienoopen');
var xssFilter = require('x-xss-protection');

var favicon = require('serve-favicon');
var logger = require('morgan');
var port = process.env.PORT || 7300;

var environment = process.env.NODE_ENV;

app.use(favicon(__dirname + '/favicon.ico'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(compress());
app.use(logger('dev'));
app.use(cors());

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

var apiUrl = process.env.ApiUrl || 'api-speedydonkey.azurewebsites.net';
apiUrl = '' + apiUrl;

//Add CSP header to only allow trusted scripts and content
app.use(csp({
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'sha256-KxtbH1VwpjLMD-dX6JwdnF45uYE_xmwRym1XFjtAifg='", "'sha256-SCss7iChG-zqlqUaonanbpCZUyj_jbf5LKHb5pPDpLU='", 'cdn.raygun.io', 'www.google-analytics.com', 'cdn.au.auth0.com', 'jfc.au.auth0.com'],
    fontSrc: ["'self'", 'fonts.gstatic.com', 'data:application/font-woff', 'data:application/x-font-woff', 'cdn.auth0.com'],
    imgSrc: ["'self", 'www.google-analytics.com', 'data:', 'www.gravatar.com'],
    styleSrc: ["'self'", "'unsafe-inline", 'fonts.googleapis.com'],
    connectSrc: ["'self'", apiUrl, 'cdn.raygun.io', 'api.raygun.io', 'jfc.au.auth0.com'],
    reportUri: 'report-uri.io/report/cb45e022bf5061dd8d8fc15e2abdad4e'
}));
app.get('/ping', function (req, res, next) {
    console.log(req.body);
    res.send('pong');
});

if (environment === 'test') {
    app.use('/', express.static(__dirname));
} else {
    app.use(express.static('./build/'));
}

app.listen(port, function () {
    console.log('Express server listening on port ' + port);
    console.log('env = ' + app.get('env') +
        '\n__dirname = ' + __dirname +
        '\nprocess.cwd = ' + process.cwd());
});
