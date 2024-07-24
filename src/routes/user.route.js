import { Router } from "express";
import { registerUser, loginUser, logoutUser, getUserProfile, updateUserProfile, deleteUser } from "../controllers/user.controller.js";
import { verifyJWT, adminMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)

// secured Routes
router.route("/logout").post(verifyJWT, logoutUser)

router.route("/id").get(verifyJWT, getUserProfile)

router.route("/id").put(verifyJWT, updateUserProfile)

router.route("/:id").delete(adminMiddleware, deleteUser)
export default router
