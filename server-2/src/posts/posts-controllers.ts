import type { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../lib/response-handler.ts";
import { PostServices } from "./posts-services.ts";

export class PostControllers {
  /**
   * @static createPost
   * @description Handles the creation of a new post.
   */
  public static async createPost(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const postData = { ...req.body, author: req.user?.id };
      const post = await PostServices.createPost(postData);
      ResponseHandler.created(res, 201, "Post created successfully", post);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static getPosts
   * @description Handles fetching all published posts with pagination.
   */
  public static async getPosts(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { posts, total } = await PostServices.getPosts(limit, page);
      ResponseHandler.ok(res, 200, "Posts fetched successfully", {
        posts,
        total,
        page,
        limit,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static getAllPostsForAdmin
   * @description Handles fetching all posts for an admin user.
   */
  public static async getAllPostsForAdmin(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { posts, total } = await PostServices.getAllPostsForAdmin(
        limit,
        page,
      );
      ResponseHandler.ok(res, 200, "All posts fetched successfully", {
        posts,
        total,
        page,
        limit,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static getPostBySlug
   * @description Handles fetching a single post by its slug.
   */
  public static async getPostBySlug(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const rawSlug = req.params.slug as string;
      const post = await PostServices.getPostBySlug(rawSlug);
      ResponseHandler.ok(res, 200, "Post fetched successfully", post);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static addComment
   * @description Handles adding a new comment to a post.
   */
  public static async addComment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const postId = req.params.postId as string;
      const authorId = req.user!.id;
      const { content, parentId } = req.body;

      const comment = await PostServices.addComment(
        postId,
        authorId,
        content,
        parentId,
      );
      ResponseHandler.created(res, 201, "Comment added successfully", comment);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static addReaction
   * @description Handles adding, updating, or removing a reaction from a post.
   */
  public static async addReaction(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const postId = req.params.postId as string;
      const authorId = req.user!.id;
      const { type } = req.body;

      const result = await PostServices.addOrUpdateReaction(
        postId,
        authorId,
        type,
      );
      ResponseHandler.ok(res, 200, result.message, result);
    } catch (error) {
      next(error);
    }
  }
}
