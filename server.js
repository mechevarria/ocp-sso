'use strict';

let compression = require('compression');
let express = require('express');
let logger = require('morgan');
let http = require('http');
let path = require('path');
let proxy = require('http-proxy-middleware');

// either proxy.local.json or proxy.ocp.json
let config = require(`./${process.argv[2]}`);

let app = express();

app.set('port', process.env.PORT || 4200);

app.use(compression());

app.use(logger('combined'));

app.use(express.static(path.join(__dirname, 'dist')));

let proxyContext = Object.keys(config)[0];
let proxyOptions = config[proxyContext];
let backendProxy = proxy(proxyOptions);
app.use(proxyContext, backendProxy);

app.use(function (req, res) {
  res.status(404).sendFile(__dirname + '/dist/index.html');
});

app.use(function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
