import { Router, } from "express";
import { HttpException } from "./exceptions/http-exception.js";
import { validationResult } from "express-validator";
export class AppRoutesHandler {
    routes;
    constructor() {
        this.routes = Router();
    }
    checkValidationResult(req, _res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            next(new HttpException(400, errors?.array()[0]?.msg || "validation error"));
        }
        next();
    }
}
