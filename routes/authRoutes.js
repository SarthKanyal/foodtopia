import express from "express";
import { login, register, updateUser } from "../controllers/authController.js";
import {
  registerMiddleware,
  loginMiddleware,
  authMiddleware,
} from "../middleware/index.js";

const router = express.Router();

router.route("/login").post(loginMiddleware, login);
router.route("/register").post(registerMiddleware, register);
router.route("/updateUser").patch(authMiddleware, updateUser);

export default router;
