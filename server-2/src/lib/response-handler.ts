import type { Response } from "express";

export class ResponseHandler {
  public static created(
    res: Response,
    statusCode: number,
    message: string,
    data?: any,
  ) {
    res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }

  public static ok(
    res: Response,
    statusCode: number,
    message: string,
    data?: any,
  ) {
    res.status(statusCode).json({
      success: true,
      statusCode,
      message,
      data,
    });
  }
}
