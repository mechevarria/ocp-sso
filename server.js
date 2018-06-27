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

app.set('port', process.argv[3] || 8080);

app.use(compression());

app.use(logger('combined'));

app.use(express.static(path.join(__dirname, 'dist')));

let proxyContext = Object.keys(config)[0];
let proxyOptions = config[proxyContext];
let backendProxy = proxy(proxyOptions);
app.use(proxyContext, backendProxy);

app.use(function (req, res) {

  // respond with index to process links
  if (req.accepts('html')) {
    res.sendFile(__dirname + '/dist/index.html');
    return;
  }

  // otherwise resource was not found
  res.status(404);
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }

  res.type('txt').send('Not found');
});

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
