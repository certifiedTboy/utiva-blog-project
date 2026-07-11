import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";
import { Jwt } from "./jwt.ts";
import { HttpException } from "./exceptions/http-exception.ts";
import { validationResult } from "express-validator";
import { type IJWTPayload } from "./types.ts";

declare module "express" {
  interface Request {
    user?: IJWTPayload;
  }
}

export class AppRoutesHandler {
  routes: Router;
  jwtOps: Jwt;
  constructor() {
    this.routes = Router();
    this.jwtOps = new Jwt();
  }

  checkValidationResult(req: Request, _res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(
        new HttpException(400, errors?.array()[0]?.msg || "validation error"),
      );
    }

    next();
  }

  authGuard(req: Request, _res: Response, next: NextFunction) {
    const authToken = req.cookies["authToken"];
    if (!authToken) {
      throw new HttpException(403, "Unauthorized");
    }

    const payload = this.jwtOps.verifyAccessToken(authToken);

    if (!payload) {
      throw new HttpException(401, "jwt expired");
    }

    req.user = payload;
    next();
  }

  adminGuard(req: Request, _res: Response, next: NextFunction) {
    const authToken = req.cookies["authToken"];
    if (!authToken) {
      throw new HttpException(403, "Unauthorized");
    }

    const payload = this.jwtOps.verifyAccessToken(authToken);

    if (!payload) {
      throw new HttpException(401, "jwt expired");
    }

    if (payload.role !== "admin") {
      throw new HttpException(403, "Unauthorized");
    }

    req.user = payload;
    next();
  }

  refreshTokenGuard(req: Request, _res: Response, next: NextFunction) {
    const refreshToken = req.headers["authorization"];

    if (!refreshToken || refreshToken?.split(" ")[0] !== "Bearer") {
      throw new HttpException(403, "invalid jwt token");
    }

    const payload = this.jwtOps.verifyRefreshToken(
      refreshToken?.split(" ")[1]!,
    );

    if (!payload) {
      throw new HttpException(403, "unauthorized");
    }

    req.user = payload;
    next();
  }
}
