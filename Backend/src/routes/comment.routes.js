import { Router } from "express";
import { addComment, getComments } from "../controllers/comment.controller.js";
import authValidation from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/add-comment/:id").post(authValidation, addComment);
router.route("/comments/:id").get(authValidation, getComments);

export default router;
