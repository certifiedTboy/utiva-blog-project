const K = require("../constants/index");

class UnprocessableError {
  constructor(message = K.ResponseMessage.ERR_UNPROCESSABLE, metaData) {
    K.httpStatusCode.UNPROCESSABLE_ENTITY, message, metaData;
  }
}

module.exports = UnprocessableError;
