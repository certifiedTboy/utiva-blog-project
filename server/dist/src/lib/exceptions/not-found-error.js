import { HttpException } from "./http-exception.js";
export function notFoundException(req, res) {
    return res.status(404).json({
        error: "enpoint does not exist",
        path: req.originalUrl,
        method: req.method,
    });
}
export function globalErrorHandler(err, _, res) {
    let statusCode;
    let message;
    if (err instanceof HttpException) {
        statusCode = err.statusCode || 500;
        message = err.message || "Internal Server Error";
        if (message === "jwt expired") {
            res.status(401).json({ error: message, status: 401 });
        }
        else {
            res.status(statusCode).json({ error: message, status: statusCode });
        }
    }
}
