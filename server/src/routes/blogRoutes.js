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
  reactToBlog,
  commentToBlog,
  editComment,
  deleteComment,
} = require("../controllers/blogController");
const Authenticate = require("../middlewares/authorization/Authenticate");
const {
  checkBlogDataValidity,
  checkCommentDataValidity,
} = require("../middlewares/validators/blogDataValidator");

const {
  checkBlogOwnership,
} = require("../middlewares/authorization/blogAuthorization");
const router = express.Router();

router.post("/create-blog", checkBlogDataValidity, Authenticate, createBlog);
router.post("/:blogId", Authenticate, checkBlogOwnership, publishBlog);
router.get("/", getAllBlogs);
router.get("/published-blogs", getAllPublishedBlogs);
router.get("blogs-by-user", Authenticate, getBlogsByAUser);
router.get("/:blogTitle", getBlogByTitle);
router.put(
  "/edit-blog/:blogId",
  checkBlogDataValidity,
  Authenticate,
  checkBlogOwnership,
  editBlog
);
router.delete(
  "/delete-blog/:blogId",
  Authenticate,
  checkBlogOwnership,
  deleteBlog
);

// reaction to blog route
router.post("/react-to-blog/:blogId", Authenticate, reactToBlog);

// blog comment routes
router.post(
  "/add-comment/:blogId",
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
router.delete(
  "/delete-comment/:blogId/:commentId",
  Authenticate,
  deleteComment
);

module.exports = router;
