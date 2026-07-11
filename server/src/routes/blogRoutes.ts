const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogByTitle,
  editBlog,
  deleteBlog,
  publishBlog,
  getAllPublishedBlogs,
  getBlogsByAUser,
  getBlogById,
  reactToBlog,
  commentToBlog,
  editComment,
  deleteComment,
  getBlogComments,
} = require("../controllers/blogController");
const Authenticate = require("../middlewares/authorization/Authenticate");
const {
  checkBlogDataValidity,
  checkCommentDataValidity,
} = require("../middlewares/validators/blogDataValidator");

const {
  checkBlogOwnership,
} = require("../middlewares/authorization/blogAuthorization");
const {
  checkUserIsAdmin,
} = require("../middlewares/authorization/userAuthorization");
const router = express.Router();

router.post(
  "/create",
  checkBlogDataValidity,
  Authenticate,
  checkUserIsAdmin,
  createBlog
);
router.put(
  "/:blogId/publish",
  Authenticate,
  checkUserIsAdmin,
  checkBlogOwnership,
  publishBlog
);
router.get("/", getAllBlogs);
router.get("/published-blogs", getAllPublishedBlogs);
router.get("/blogs-by-user/:userId", getBlogsByAUser);
router.get(
  "/:blogId/user-blog-by-id",
  Authenticate,
  checkBlogOwnership,
  getBlogById
);
router.get("/:blogTitle", getBlogByTitle);
router.put(
  "/:blogId/edit",
  checkBlogDataValidity,
  Authenticate,
  checkUserIsAdmin,
  checkBlogOwnership,
  editBlog
);
router.delete(
  "/:blogId/delete",
  Authenticate,
  checkUserIsAdmin,
  checkBlogOwnership,
  deleteBlog
);

// reaction to blog route
router.post("/:blogId/react", Authenticate, reactToBlog);

// blog comment routes
router.post(
  "/:blogId/comments",
  checkCommentDataValidity,
  Authenticate,
  commentToBlog
);

router.put(
  "/edit-comment/:blogId/:commentId",
  checkCommentDataValidity,
  Authenticate,
  editComment
);
router.delete("/:blogId/comments/:commentId", Authenticate, deleteComment);

router.get("/:blogId/comments", getBlogComments);

module.exports = router;
