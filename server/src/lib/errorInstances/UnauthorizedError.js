const K = require("../constants/index");

class UnauthorizedError {
  constructor(message = K.ResponseMessage.ERR_UNAUTHENTICATED, metaData) {
    K.httpStatusCode.UNAUTHORIZED, message, metaData;
  }
}

module.exports = UnauthorizedError;
