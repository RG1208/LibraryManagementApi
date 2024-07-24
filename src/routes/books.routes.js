import { Router } from "express";
import { createBook, getBooks, getBookProfile, updateBook, deleteBook } from "../controllers/books.controllers.js";
import { adminMiddleware } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(adminMiddleware, createBook)
router.route("/getBooks").get(getBooks)
router.route("/:id").get(getBookProfile)
router.route("/:id").put(adminMiddleware, updateBook)
router.route("/:id").delete(adminMiddleware, deleteBook)

export default router
