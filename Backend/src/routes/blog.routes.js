import { Router } from "express";
import {
  addBlog,
  deleteBlog,
  getAllBlog,
  getBlog,
  getFeaturedBlog,
  updateBlog,
} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.middleware.js";
import authValidation from "../middlewares/auth.middleware.js";
import { sanitizeForBlog } from "../middlewares/validation.middleware.js";

const router = Router();

router
  .route("/add-blogs")
  .post(authValidation, upload.single("coverImage"), sanitizeForBlog, addBlog);
router.route("/edit-blog/:id").patch(
  authValidation,

  upload.single("coverImage"),
  sanitizeForBlog,
  updateBlog
);
router.route("/delete-blog/:id").get(authValidation, deleteBlog);
router.route("/blog/:id").get(getBlog);
router.route("/all-blogs").get(getAllBlog);
router.route("/blogs/featuredBlog").get(getFeaturedBlog);

export default router;
