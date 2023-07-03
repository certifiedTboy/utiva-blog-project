const express = require("express");
const userRoutes = require("./userRoutes");

const apiV1 = express.Router();

apiV1.use("/user", userRoutes);

module.exports = apiV1;
