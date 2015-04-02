/**
 * The ldap-pass main script on backend.
 *
 * @author  TADOKORO Saneyuki <saneyan@seginus.jp>
 */
var fs = require('fs');
var https = require('https');
var express = require('express');
var bodyParser = require('body-parser');
var errorh = require('./error/handlers');
var key = fs.readFileSync('./localhost.key', 'utf-8');
var cert = fs.readFileSync('./localhost.crt', 'utf-8');

var app = express();

app.use(express.static('app/public'));
app.use(bodyParser());

app.use(require('./validation'));
app.use('/', require('./routes/password'));

app.use(errorh.logErrors);
app.use(errorh.badRequestErrorHandler);
app.use(errorh.errorHandler);

https.createServer({key: key, cert: cert}, app).listen(3000);
