import { Router } from "express";
import { registerAuthor, getAuthors, getUserProfile, updateAuthorProfile, deleteAuthor } from "../controllers/author.controller.js";


const router = Router()

router.route("/register").post(registerAuthor)
router.route("/getAuthors").get(getAuthors)
router.route("/:id").get(getUserProfile)
router.route("/:id").put(updateAuthorProfile)
router.route("/:id").delete(deleteAuthor)
export default router
