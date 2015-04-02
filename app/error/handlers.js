/**
 * Error handlers.
 *
 * @author  TADOKORO Saneyuki <saneyan@seginus.jp>
 */

var errors = require('./errors');

exports.badRequestErrorHandler = function (err, req, res, next) {
  if (err instanceof errors.BadRequestError)
    send(res, err);
  else
    next(err);
};

exports.errorHandler = function (err, req, res, next) {
  send(res, new errors.InternalServerError(err));
};

exports.logErrors = function (err, req, res, next) {
  console.error(err.stack);
  next(err);
};

function send(res, err) {
  res.status(err.code).json({ errors: [{ 'message': err.message, 'errors': err }] });
}
