const mongoose = require("mongoose");
const envVariable = require("../../config/config");

const { MONGO_URL } = envVariable;

mongoose.connection.once("open", () => {
  console.log("db connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error("connection failed");
});

const mongoConnect = async () => {
  await mongoose.connect(MONGO_URL);
};

const mongoDbTransaction = async () => {
  const session = await mongoose.startSession();
  return session;
};
module.exports = { mongoConnect, mongoDbTransaction };
