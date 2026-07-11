import { Request, Response, NextFunction } from "express";
import UnprocessableError from "../../lib/errorInstances/UnprocessableError.js";

export const checkBlogDataValidity = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { title, description, content } = req.body;

    if (!title || !description || !content) {
      throw new UnprocessableError("All blog input fields are required");
    }

    if (title.length > 50) {
      throw new UnprocessableError(
        "title can not be longer than 100 characters",
      );
    }

    if (description.length > 150) {
      throw new UnprocessableError(
        "description can not be longer than 250 characters",
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const checkCommentDataValidity = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { text } = req.body;
    if (!text) {
      throw new UnprocessableError("Comment field cannot be empty");
    }

    if (text.length > 1000) {
      throw new UnprocessableError(
        "comments should not be longer than 1000 characters",
      );
    }

    next();
  } catch (error) {
    next(error);
  }
};
