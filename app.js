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
var azure        = require('azure');
var util = require('util');
var server;

var appDir =  __dirname + './src/'; // Our NG code is served from root
var environment = process.env.NODE_ENV;
var pkg = require('./package.json');

// var forceSsl = function (req, res, next) {

//     res.send('req.protocol: ' + util.inspect(req));

//     // if (req.protocol !== 'https') {
//     //     return res.redirect(['https://', req.get('Host'), req.url].join(''));
//     // }
//     // return next();
// };

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

//app.get('*', forceSsl);
if(environment === 'stage') {
    console.log('** STAGE **');
    app.use('/', express.static('./build/stage/'));
} else {
    console.log('** DEV **');
//    app.use('/', express.static(appDir));
    app.use('/', express.static(pkg.paths.client));
    app.use('/', express.static('./'));
}



console.log('SETTING UP API URL');
var apiUrl = 'api-speedydonkey.azurewebsites.net';

azure.RoleEnvironment.getConfigurationSettings(function(error, settings) {
    console.log('INSIDE AZURE');
  if (!error) {
    apiUrl = settings['ApiUrl'];
    console.log('NO ERROR, API IS' + apiUrl);
  }
  apiUrl = 'https://' + apiUrl;
});

app.get('/apiUrl', function(req, res, next) {
    console.log('GETTING THE API URL FOR YOU');
    res.send(apiUrl);
});

server = http.createServer(app);

server.listen(port, function(){
    console.log('Express server listening on port ' + port);
    console.log('env = '+ app.get('env') +
        '\n__dirname = ' + __dirname  +
        '\nprocess.cwd = ' + process.cwd() );
});

updater.init(server);



