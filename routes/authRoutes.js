import express from "express";
import { login, register, updateUser } from "../controllers/authController.js";
import { registerMiddleware } from "../middleware/index.js";

const router = express.Router();

router.route("/login").post(login);
router.route("/register").post(registerMiddleware, register);
router.route("/updateUser").patch(updateUser);

export default router;
