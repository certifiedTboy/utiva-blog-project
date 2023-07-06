const express = require("express");
const {
  createBlog,
  getAllBlogs,
  getBlogByTitle,
  editBlog,
  deleteBlog,
} = require("../controllers/blogController");
const Authenticate = require("../middlewares/authorization/Authenticate");
const {
  checkBlogDataValidity,
} = require("../middlewares/validators/blogDataValidator");

const {
  checkBlogOwnership,
} = require("../middlewares/authorization/blogAuthorization");
const router = express.Router();

router.post("/create-blog", checkBlogDataValidity, Authenticate, createBlog);
router.get("/", getAllBlogs);
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

module.exports = router;
