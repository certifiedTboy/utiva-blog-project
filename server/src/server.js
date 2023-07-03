const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const envVariable = require("./config/config");

const { PORT } = envVariable || 3000;

const startServer = async () => {
  server.listen(PORT, () => {
    console.log(`server is live on port: ${PORT}`);
  });
};

startServer();
