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
// var dotenv = require('dotenv');
// dotenv.load();
var util = require('util');
var server;

var appDir =  __dirname + './src/'; // Our NG code is served from root
var environment = process.env.NODE_ENV;
var pkg = require('./package.json');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(compress());            // Compress response data with gzip
app.use(fileServer(appDir));    // Support static file content
app.use(cors());                // enable ALL CORS requests

app.use('/', express.static(pkg.paths.client));
app.use('/', express.static('./'));



app.get('/apiUrl', function(req, res, next) {
	var apiUrl = process.env.ApiUrl;
    res.send(apiUrl);
});

app.get('/getConfig', function(req, res, next) {
	var config = {
		company: process.env.Company
	};
    res.send(config);
});

server = http.createServer(app);

server.listen(port);

updater.init(server);



