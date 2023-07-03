const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const envVariable = require("./config/config");
const mongoConnect = require("./helpers/database/dbConfig");

const { PORT } = envVariable || 3000;

const startServer = async () => {
  await mongoConnect();
  server.listen(PORT, () => {
    console.log(`server is live on port: ${PORT}`);
  });
};

startServer();
