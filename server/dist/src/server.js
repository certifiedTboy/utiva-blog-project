import http from "node:http";
import app from "./app.js";
import { PORT } from "./lib/constants.js";
import { AppHelpers } from "./helpers/app-helpers.js";
const httpServer = http.createServer(app);
async function startServer() {
    await AppHelpers.connectDb();
    httpServer.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
}
startServer();
