'use strict';

let compression = require('compression');
let express = require('express');
let logger = require('morgan');
let https = require('https');
let http = require('http');
let fs = require('fs');
let path = require('path');
let proxy = require('http-proxy-middleware');

// either proxy.local.json or proxy.ocp.json
const config = require(`./${process.argv[2]}`);

let app = express();

app.set('port', process.argv[3] || 8080);

app.use(compression());

app.use(logger('combined'));

app.use(express.static(path.join(__dirname, 'dist')));

// 0 is the jboss-api backend in the json file
let proxyContext = Object.keys(config)[0];
let proxyOptions = config[proxyContext];
let backendProxy = proxy(proxyOptions);
app.use(proxyContext, backendProxy);

// 1 is the spring-api backend in the json file
proxyContext = Object.keys(config)[1];
proxyOptions = config[proxyContext];
backendProxy = proxy(proxyOptions);
app.use(proxyContext, backendProxy);

app.use((req, res) => {

  // respond with index to process links
  if (req.accepts('html')) {
    res.sendFile(__dirname + '/dist/index.html');
    return;
  }

  // otherwise resource was not found
  res.status(404);
  if (req.accepts('json')) {
    res.send({error: 'Not found'});
    return;
  }

  res.type('txt').send('Not found');
});

const certConfig = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync(('server.cert'))
};

// for local ssl
if(app.get('port') !== 8080) {
  https.createServer(certConfig, app)
    .listen(app.get('port'), () => {
      console.log('Express secure server listening on port ' + app.get('port'));
    });
} else {
  // on openshift let route control ssl
  http.createServer(app)
    .listen(app.get('port'), () => {
      console.log('Express server listening on port ' + app.get('port'));
    });
}
