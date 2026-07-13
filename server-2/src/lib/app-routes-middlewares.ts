import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";
import { newJwt } from "./jwt.ts";
import { HttpException } from "./exceptions/http-exception.ts";
import { validationResult } from "express-validator";
import { type IJWTPayload } from "./types.ts";

/**
 * Extends the Express Request interface to include a user property.
 * This allows middleware to attach the authenticated user's JWT payload
 * to the request object for use in subsequent handlers.
 */
declare module "express" {
  interface Request {
    user?: IJWTPayload;
  }
}

/**
 * @class AppRoutesHandler
 * @description A base class that provides common middleware handlers for application routes.
 * This includes validation checking and various authentication guards.
 */
export class AppRoutesHandler {
  routes: Router;

  constructor() {
    this.routes = Router();
  }

  /**
   * @method checkValidationResult
   * @description A middleware to check for validation errors from express-validator.
   * If errors are found, it passes a new HttpException to the next error-handling middleware.
   * @param {Request} req - The Express request object.
   * @param {Response} _res - The Express response object (unused).
   * @param {NextFunction} next - The next middleware function in the stack.
   */
  checkValidationResult(req: Request, _res: Response, next: NextFunction) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      next(
        new HttpException(400, errors?.array()[0]?.msg || "validation error"),
      );
    }

    next();
  }

  /**
   * @method authGuard
   * @description A middleware to protect routes by ensuring a user is authenticated.
   * It checks for a JWT in the 'authToken' cookie, verifies it, and attaches the payload to `req.user`.
   * @param {Request} req - The Express request object.
   * @param {Response} _res - The Express response object (unused).
   * @param {NextFunction} next - The next middleware function in the stack.
   */
  authGuard(req: Request, _res: Response, next: NextFunction) {
    try {
      const authToken = req.cookies["authToken"];

      if (!authToken) {
        throw new HttpException(403, "Unauthorized");
      }

      const payload = newJwt.verifyAccessToken(authToken);

      req.user = payload;
      next();
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        next(new HttpException(403, "Unathorized"));
      }

      if (error instanceof Error) {
        if (error?.message === "invalid signature") {
          next(new HttpException(401, "Unauthorized"));
        }
        if (error?.message === "jwt expired") {
          next(new HttpException(401, "jwt expired"));
        }
      }
    }
  }

  /**
   * @method adminGuard
   * @description A middleware that acts as an authentication and authorization guard.
   * It ensures that a user is authenticated via a JWT in the 'authToken' cookie
   * and that the user has the 'admin' role.
   * @param {Request} req - The Express request object.
   * @param {Response} _res - The Express response object (unused).
   * @param {NextFunction} next - The next middleware function in the stack.
   */
  adminGuard(req: Request, _res: Response, next: NextFunction) {
    try {
      const authToken = req.cookies["authToken"];
      if (!authToken) {
        throw new HttpException(403, "Unauthorized");
      }

      const payload = newJwt.verifyAccessToken(authToken);

      if (payload.role !== "admin") {
        throw new HttpException(403, "Unauthorized");
      }

      req.user = payload;
      next();
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method refreshTokenGuard
   * @description A middleware to handle token refresh requests.
   * It validates a refresh token provided in the 'Authorization' header (Bearer scheme),
   * verifies it, and attaches the payload to `req.user`.
   * @param {Request} req - The Express request object.
   * @param {Response} _res - The Express response object (unused).
   * @param {NextFunction} next - The next middleware function in the stack.
   */
  refreshTokenGuard(req: Request, _res: Response, next: NextFunction) {
    const refreshToken = req.headers["authorization"];

    if (!refreshToken || refreshToken?.split(" ")[0] !== "Bearer") {
      throw new HttpException(403, "invalid jwt token");
    }

    const payload = newJwt.verifyRefreshToken(refreshToken?.split(" ")[1]!);

    if (!payload) {
      throw new HttpException(403, "unauthorized");
    }

    req.user = payload;
    next();
  }
}
