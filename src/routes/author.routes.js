import { Router } from "express";
import { registerAuthor } from "../controllers/author.controller.js";


const router = Router()

router.route("/register").post(registerAuthor)

export default router
