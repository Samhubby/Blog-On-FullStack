import { Router } from "express";
import {
  loginUser,
  logOut,
  registerUser,
  updateFullName,
  updatePassword,
  updateAvatar,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import upload from "../middlewares/multer.middleware.js";
import authValidation from "../middlewares/auth.middleware.js";
import {
  sanitizeForLogin,
  sanitizeForRegister,
} from "../middlewares/validation.middleware.js";

const router = Router();

router
  .route("/signup")
  .post(upload.single("avatar"), sanitizeForRegister, registerUser);
router.route("/login").post(sanitizeForLogin, loginUser);
router.route("/logout").get(authValidation, logOut);
router.route("/update-fullName").patch(authValidation, updateFullName);
router.route("/update-password").patch(authValidation, updatePassword);
router
  .route("/update-avatar")
  .patch(authValidation, upload.single("newAvatar"), updateAvatar);
router.route("/refresh-token").post(authValidation, refreshAccessToken);

export default router;
