import type { Request, Response, NextFunction } from "express";
import { ResponseHandler } from "../lib/response-handler.ts";
import { HttpException } from "../lib/exceptions/http-exception.ts";
import { PostServices } from "./posts-services.ts";
import eventEmitter from "../helpers/events.ts";

import { isValidObjectId } from "mongoose";
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
   * @static updatePost
   * @description Handles updating a post.
   */
  public static async updatePost(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.params;
      eventEmitter.emitEvent("update-post", {
        id: `update-post-${postId}`,
        delayInMinutes: 0.5,
        postId,
        postData: req.body,
      });
      ResponseHandler.ok(res, 202, "Post update has been queued.");
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
   * @static updatePostViewCount
   * @description Handles updating a post's view count.
   */
  public static async updatePostViewCount(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.params;
      eventEmitter.emitEvent("update-post-view-count", {
        id: `update-post-view-count-${postId}`,
        delayInMinutes: 0.5,
        postId,
      });
      ResponseHandler.ok(res, 202, "Post view count update has been queued.");
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
      const { content, parentId, tempId } = req.body;

      eventEmitter.emitEvent("add-comment", {
        id: `add-comment-${postId}-${tempId}`,
        delayInMinutes: 0.5,
        postId,
        authorId,
        content,
        parentId,
        tempId,
      });

      return ResponseHandler.created(res, 202, "Comment has been queued.");
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

      eventEmitter.emitEvent("react-to-post", {
        id: `react-to-post-${postId}-${authorId}`,
        delayInMinutes: 0.5,
        postId,
        authorId,
        type,
      });
      ResponseHandler.ok(res, 202, "Reaction has been queued.");
    } catch (error) {
      console.log(error);
      next(error);
    }
  }

  /**
   * @static getAllComments
   * @description Handles fetching all comments for an admin user.
   */
  public static async getAllComments(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const { comments, total } = await PostServices.getAllComments(
        limit,
        page,
      );
      ResponseHandler.ok(res, 200, "All comments fetched successfully", {
        comments,
        total,
        page,
        limit,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static getCommentsByPost
   * @description Handles fetching all comments for a post.
   */
  public static async getCommentsByPost(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.params;

      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const { comments, total } = await PostServices.getCommentsByPost(
        postId as string,
        limit,
        page,
      );
      ResponseHandler.ok(res, 200, "Comments fetched successfully", {
        comments,
        total,
        page,
        limit,
      });
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static getReactionsByPost
   * @description Handles fetching all reactions for a post.
   */
  public static async getReactionsByPost(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.params;
      const reactions = await PostServices.getReactionsByPost(postId as string);
      ResponseHandler.ok(res, 200, "Reactions fetched successfully", reactions);
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static updateComment
   * @description Handles updating a comment.
   */
  public static async updateComment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { commentId } = req.params;
      const { content } = req.body;
      eventEmitter.emitEvent("update-comment", {
        id: `update-comment-${commentId}`,
        delayInMinutes: 0.5,
        commentId,
        content,
      });
      ResponseHandler.ok(res, 202, "Comment update has been queued.");
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static deletePost
   * @description Handles deleting a post.
   */
  public static async deletePost(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { postId } = req.params;
      eventEmitter.emitEvent("delete-post", {
        id: `delete-post-${postId}`,
        delayInMinutes: 0.5,
        postId,
      });
      ResponseHandler.ok(res, 202, "Post deletion has been queued.");
    } catch (error) {
      next(error);
    }
  }

  /**
   * @static deleteComment
   * @description Handles deleting a comment.
   */
  public static async deleteComment(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const { commentId } = req.params;
      const { postId } = req?.query;

      const eventId = `add-comment-${postId}-${commentId}`;

      if (!isValidObjectId(commentId) && eventEmitter.activeJobs.has(eventId)) {
        // This is a tempId, try to cancel the add-comment event immediately

        const wasCancelled = eventEmitter.cancelEvent(eventId);

        if (wasCancelled) {
          console.log(`Pending add-comment job ${eventId} was cancelled.`);
          return ResponseHandler.ok(res, 200, "Comment creation cancelled.");
        }
      }

      // If it's a real commentId or the add-comment job was already processed,
      // queue the deletion from the database.
      eventEmitter.emitEvent("delete-comment", {
        id: `delete-comment-${commentId}`, // This can be a real or temp id
        delayInMinutes: 0.5,
        commentId,
      });
      return ResponseHandler.ok(res, 202, "Comment deletion has been queued.");
    } catch (error) {
      next(error);
    }
  }

  /**
   * @method uploadFiles
   * @description generate a signed and secured url to upload file on the AWS s3 bucket directly from the client side
   */
  public static async uploadFiles(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      if (!req.file) {
        throw new HttpException(400, "No file uploaded.");
      }

      const result = await PostServices.uploadFileToAWSs3Bucket(req.file);
      ResponseHandler.ok(res, 200, "File uploaded successfully", result);
    } catch (error) {
      next(error);
    }
  }
}
