import { Router } from "express";
import { createBook } from "../controllers/books.controllers.js";


const router = Router()

router.route("/register").post(createBook)

export default router
