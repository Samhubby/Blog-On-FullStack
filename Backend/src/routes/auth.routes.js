import { Router } from "express";
import { authCheck } from "../controllers/auth.controller.js";
const router = Router();

router.route("/authCheck").get(authCheck);

export default router;
