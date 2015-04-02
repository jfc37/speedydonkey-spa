/*jshint node:true*/
'use strict';

var express      = require('express');
var app          = express();
var bodyParser   = require('body-parser');
var compress     = require('compression');
var cors         = require('cors');
var favicon      = require('serve-favicon');
var fileServer   = require('serve-static');
var http         = require('http');
var logger       = require('morgan');
var port         = process.env['PORT'] || 7300;
var updater      = require('./src/server/updater');
var server;

var appDir =  __dirname + './src/'; // Our NG code is served from root
var environment = process.env.NODE_ENV;
var pkg = require('./package.json');



var forceSsl = function (req, res, next) {
    console.log("checking for https....");
    if (req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(['https://', req.get('Host'), req.url].join(''));
    }
    return next();
};


app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(compress());            // Compress response data with gzip
//app.use(logger('dev'));
//app.use(favicon(__dirname + 'src/server/favicon.ico'));
app.use(fileServer(appDir));    // Support static file content
app.use(cors());                // enable ALL CORS requests

console.log('PORT=' + port);
console.log('NODE_ENV=' + environment);

if(environment === 'dev') {
    //app.get('*', forceSsl);
    console.log('** DEV **');
//    app.use('/', express.static(appDir));
    app.use('/', express.static(pkg.paths.client));
    app.use('/', express.static('./'));

    app.get('/ping', function(req, res, next) {
        console.log(req.body);
        res.send('pong');
    });
} else {
    console.log('** ' + environment + ' **');
    app.use('/', express.static('./build/stage/'));
}


server = http.createServer(app);

server.listen(port, function(){
    console.log('Express server listening on port ' + port);
    console.log('env = '+ app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd() );
});

updater.init(server);



