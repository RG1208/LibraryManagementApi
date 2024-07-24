import { Router } from "express";
import { registerAuthor, getAuthors, getUserProfile, updateAuthorProfile, deleteAuthor } from "../controllers/author.controller.js";
import { adminMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(adminMiddleware, registerAuthor)
router.route("/getAuthors").get(getAuthors)
router.route("/:id").get(getUserProfile)
router.route("/:id").put(adminMiddleware, updateAuthorProfile)
router.route("/:id").delete(adminMiddleware, deleteAuthor)
export default router
