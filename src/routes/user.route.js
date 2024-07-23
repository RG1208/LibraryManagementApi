import { Router } from "express";
import { registerUser, loginUser, logoutUser } from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured Routes
router.route("/logout").post(logoutUser)

export default router
