/**
 * Errors.
 *
 * @author  TADOKORO Saneyuki <saneyan@seginus.jp>
 */

var BadRequestError = exports.BadRequestError = function (message) {
  this.name = 'bad_request';
  this.message = 'Bad Request';
  this.code = 400;
};

BadRequestError.prototype.__proto__ = Error.prototype;

var InternalServerError = exports.InternalServerError = function (message) {
  this.name = 'internal_server_error';
  this.message = 'Internal Server Error';
  this.code = 500;
};

InternalServerError.prototype.__proto__ = Error.prototype;
