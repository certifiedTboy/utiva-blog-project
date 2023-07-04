const express = require("express");
const K = require("../constants/index");
const httpStatusCode = require("../constants/httpStatusCode");

class ResponseHandler {
  static send(res, statusCode, data, message = K.responseMessage.SUCCESS) {
    return res.status(statusCode).json({ message: message, data });
  }

  static ok(res, data, message = K.responseMessage.OK) {
    return ResponseHandler.send(res, httpStatusCode.SUCCESS, data, message);
  }

  static created(res, data, message = K.responseMessage.CREATED) {
    return ResponseHandler.send(res, httpStatusCode.CREATED, data, message);
  }
}

module.exports = ResponseHandler;
