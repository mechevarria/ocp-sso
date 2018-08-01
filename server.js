'use strict';

let bodyParser = require('body-parser');
let compression = require('compression');
let express = require('express');
let logger = require('morgan');
let https = require('https');
let fs = require('fs');
let path = require('path');
let proxy = require('http-proxy-middleware');

// either proxy.local.json or proxy.ocp.json
const config = require(`./${process.argv[2]}`);

let app = express();

app.set('port', process.argv[3] || 8443);

app.use(compression());

app.use(logger('combined'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));

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
    res.send({error: 'Not found'});
    return;
  }

  res.type('txt').send('Not found');
});

const certConfig = {
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync(('server.cert'))
};

https.createServer(certConfig, app)
  .listen(app.get('port'), () => {
    console.log('Express secure server listening on port ' + app.get('port'));
  });
