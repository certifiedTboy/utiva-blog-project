const K = require("../constants/index");

class UnauthenticatedError {
  constructor(message = K.ResponseMessage.ERR_UNAUTHENTICATED, metaData) {
    K.httpStatusCode.UNAUTHENTICATED, message, metaData;
  }
}

module.exports = UnauthenticatedError;
