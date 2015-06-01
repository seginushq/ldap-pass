/**
 * The ldap-pass main script on backend.
 *
 * @author  TADOKORO Saneyuki <saneyan@seginus.jp>
 */

var server;
var fs = require('fs');
var express = require('express');
var bodyParser = require('body-parser');
var errorh = require('./error/handlers');
var config = require('./config');
var app = express();

app.use(express.static('app/public'));
app.use(bodyParser());

app.use(require('./validation'));
app.use('/', require('./routes/password'));

app.use(errorh.logErrors);
app.use(errorh.badRequestErrorHandler);
app.use(errorh.errorHandler);

if (config.server.ssl) {
  server = require('https').createServer({
    key: fs.readFileSync('./localhost.key', 'utf-8'),
    cert: fs.readFileSync('./localhost.crt', 'utf-8')
  }, app);
} else {
  server = require('http').createServer(app);
}

server.listen(config.server.port);
