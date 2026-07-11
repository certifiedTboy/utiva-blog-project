import http from "node:http";
import app from "./app.ts";
import { PORT } from "./lib/constants.ts";
import { AppHelpers } from "./helpers/app-helpers.ts";

const httpServer = http.createServer(app);

async function startServer() {
  await AppHelpers.connectDb();
  httpServer.listen(PORT, () =>
    console.log(`Server is running on port ${PORT}`),
  );
}

startServer();
