const express = require("express");
const C = require("../constants");
const HttpStatusCode = require("../constants/httpStatusCode");

class ResponseHandler {
  static send(res, statusCode, data, message = C.ResponseMessage.SUCCESS) {
    return res.status(statusCode).json({ message: message, data });
  }

  static ok(res, data, message = C.ResponseMessage.OK) {
    return ResponseHandler.send(res, HttpStatusCode.SUCCESS, data, message);
  }

  static created(res, data, message = C.ResponseMessage.CREATED) {
    return ResponseHandler.send(res, HttpStatusCode.CREATED, data, message);
  }

  static accepted(res, data, message = C.ResponseMessage.ACCEPTED) {
    return ResponseHandler.send(res, HttpStatusCode.ACCEPTED, data, message);
  }
}

module.exports = ResponseHandler;
