import { Router } from "express";
import { addBook } from "../controllers/books.controllers.js";


const router = Router()

router.route("/register").post(addBook)

export default router
