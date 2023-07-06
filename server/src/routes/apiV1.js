const express = require("express");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");
const blogRoutes = require("./blogRoutes");

const apiV1 = express.Router();

apiV1.use("/user", userRoutes);
apiV1.use("/auth", authRoutes);
apiV1.use("/blogs", blogRoutes);

module.exports = apiV1;
