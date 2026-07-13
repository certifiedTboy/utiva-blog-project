import { body } from "express-validator";
import { PostControllers } from "./posts-controllers.ts";
import { AppRoutesHandler } from "../lib/app-routes-middlewares.ts";
import { REACTION_TYPES } from "./posts-model.ts";

export class PostRoutes extends AppRoutesHandler {
  constructor() {
    super();
    this.featureRoutes();
  }

  private featureRoutes() {
    // Create a new post (protected)
    this.routes.post(
      "/",
      this.authGuard,
      this.getCreatePostValidationRules(),
      this.checkValidationResult,
      PostControllers.createPost,
    );

    // Get all posts for admin (protected, admin only)
    this.routes.get("/", this.adminGuard, PostControllers.getAllPostsForAdmin);

    // Get all posts (public)
    this.routes.get("/published", PostControllers.getPosts);

    // Get a single post by slug (public)
    this.routes.get("/:slug", PostControllers.getPostBySlug);

    // Get all comments for a post (public)
    this.routes.get("/:postId/comments", PostControllers.getCommentsByPost);

    // Add a comment to a post (protected)
    this.routes.post(
      "/:postId/comments",
      this.authGuard,
      this.getAddCommentValidationRules(),
      this.checkValidationResult,
      PostControllers.addComment,
    );

    // Get all reactions for a post (public)
    this.routes.get(
      "/:postId/reactions",
      this.checkValidationResult,
      PostControllers.getReactionsByPost,
    );

    // Add or update a reaction to a post (protected)
    this.routes.post(
      "/:postId/reactions",
      this.authGuard,
      this.getAddReactionValidationRules(),
      this.checkValidationResult,
      PostControllers.addReaction,
    );
  }

  private getCreatePostValidationRules() {
    return [
      body("title").notEmpty().withMessage("Title is required"),
      body("content").notEmpty().withMessage("Content is required"),
      body("category").notEmpty().withMessage("Category is required"),
      body("status")
        .optional()
        .isIn(["published", "draft"])
        .withMessage("Invalid status"),
      body("featured").optional().isBoolean(),
    ];
  }

  private getAddCommentValidationRules() {
    return [
      body("content").notEmpty().withMessage("Comment content is required"),
      body("parentId")
        .optional({ nullable: true })
        .isMongoId()
        .withMessage("Invalid parent ID"),
    ];
  }

  private getAddReactionValidationRules() {
    return [
      body("type")
        .notEmpty()
        .withMessage("Reaction type is required")
        .isIn(REACTION_TYPES)
        .withMessage("Invalid reaction type"),
    ];
  }
}
