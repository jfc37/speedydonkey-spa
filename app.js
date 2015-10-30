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

//Add Strict-Transport-Security header to force https
app.use(hsts({
    maxAge: 60000,
    includeSubDomains: true,
    force: true,
    preload: true
}));

var apiUrl = process.env.ApiUrl || 'api-speedydonkey.azurewebsites.net';
apiUrl = 'https://' + apiUrl;

//Add CSP header to only allow trusted scripts and content
app.use(csp({
    // Specify directives as normal
    defaultSrc: ["'self'"],
    scriptSrc: ["'self'", "'sha256-KxtbH1VwpjLMD-dX6JwdnF45uYE_xmwRym1XFjtAifg='", "'sha256-SCss7iChG-zqlqUaonanbpCZUyj_jbf5LKHb5pPDpLU='", 'https://cdn.raygun.io', 'https://www.google-analytics.com'],
    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
    imgSrc: ["'self", 'https://www.google-analytics.com', 'data:'],
    styleSrc: ["'self'", "'unsafe-inline", 'https://fonts.googleapis.com', 'https://api.raygun.io'],
    connectSrc: ["'self'", apiUrl, 'https://cdn.raygun.io'],
    reportUri: 'https://report-uri.io/report/cb45e022bf5061dd8d8fc15e2abdad4e'
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
