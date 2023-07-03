const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("server is live");
});

module.exports = app;
