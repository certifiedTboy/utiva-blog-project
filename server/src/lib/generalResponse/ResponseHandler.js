const express = require("express");
const K = require("../constants/index");
const httpStatusCode = require("../constants/httpStatusCode");

class ResponseHandler {
  static ok(res, data, message = K.responseMessage.OK) {
    return ResponseHandler.send(res, httpStatusCode.SUCCESS, data, message);
  }

  static created(res, data, message = K.responseMessage.CREATED) {
    return ResponseHandler.send(res, httpStatusCode.CREATED, data, message);
  }
}

module.exports = ResponseHandler;
