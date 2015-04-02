var validator = require('express-validator');

module.exports = validator({

  isUid: function (value) {
    return value.match(/^[a-zA-Z0-9_\-\.]+$/);
  }
});
