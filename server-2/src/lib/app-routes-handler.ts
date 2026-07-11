import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";

import { HttpException } from "./exceptions/http-exception.ts";
import { validationResult } from "express-validator";

export class AppRoutesHandler {
  routes: Router;
  constructor() {
    this.routes = Router();
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
}
