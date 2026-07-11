import { App } from "./lib/App.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./helpers/swagger-spec.ts";
import { UserRoutes } from "./users/user-routes.ts";

class ExpressApp extends App {
  public routes(): void {
    this.app.get("/", (__, res) => {
      res.json({ message: "Server is live" });
    });

    this.app.use(
      "/api/v1/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerSpec),
    );

    this.app.use("/api/v1/users", new UserRoutes().routes);
  }
}

const newApp = new ExpressApp({
  origin: ["http://localhost:5173"],
  credentials: true,
});
const { app } = newApp;

export default app;
