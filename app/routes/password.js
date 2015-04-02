/**
 * /password
 *
 * @author  TADOKORO Saneyuki <saneyan@seginus.jp>
 */

var ldap = require('ldapjs');
var express = require('express');
var errors = require('../error/errors')
var config = require('../config.json');

var router = express.Router();
var client, dn;

router.post('/password', function (req, res, next) {

  req.assert('uid', 'valid UID required').isUid();

  var errors = req.validationErrors();
  if (errors) next(new errors.BadRequestError(errors));

  var lc = config.ldap;

  dn = lc.dn.replace('%s', req.params['uid']);
  client = ldap.createClient({ url: 'ldaps://' + lc.host + ':' + lc.port });

  client.bind(dn, req.params['secret'], function (err) {
    if (err) next(err);
    else next();
  });
});

router.post('/password', function (req, res, next) {

  var change = new ldap.Change({
    operation: replace,
    modification: { 'userPassword': req.params['new_secret'] }
  });

  client.modify(dn, change, function (err) {
    if (err) next(err);
    else
      client.unbind(function (err) {
        if (err) next(err);
        else res.json(result);
      });
  });
});

module.exports = router;
