const K = require("../constants/index");

class ServerError {
  constructor(message, metaData) {
    K.httpStatusCode.SERVER_ERROR, message, metaData;
  }
}

module.exports = ServerError;
